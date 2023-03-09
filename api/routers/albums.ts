import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    if (req.query.artist) {
      const artistAlbums = await Album.find({artist: req.query.artist}).populate('artist', 'name').sort({yearOfIssue: -1});
      return res.send(artistAlbums);
    } else {
      const album = await Album.find();
      return res.send(album);
    }
  } catch (e) {
    next(e);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist', 'name image info');
    if (!album) {
      return res.status(404).send({message: 'Album is not found'});
    }
    return res.send(album);
  } catch (e) {
    next(e);
  }
});

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.artist || !req.body.yearOfIssue) {
      return res.status(404).send({message: 'Album name, year of issue or artist name is required'});
    }
    const user = (req as RequestWithUser).user;

    const album = await Album.create({
      name: req.body.name,
      artist: req.body.artist,
      yearOfIssue: req.body.yearOfIssue,
      image: req.file ? req.file.filename : null,
      isPublished: user.role === 'admin',
    });

    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    await Album.deleteOne({_id: req.params.id});
    const albums = await Album.find();
    return res.send(albums);

  } catch (e) {
    next(e);
  }
});

export default albumsRouter;