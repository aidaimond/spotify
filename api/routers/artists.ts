import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose, {HydratedDocument} from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Album from "../models/Album";
import {IArtist} from "../types";
import user from "../middleware/user";

const artistsRouter = express.Router();

artistsRouter.get('/', user, async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;

    if (user && user.role === 'admin') {
      const artist = await Artist.find();
      return res.send(artist);
    }

    const artist = await Artist.find({isPublished: true});
    return res.send(artist);

  } catch {
    return res.sendStatus(500);
  }
});

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    if (user) {
      const artist = await Artist.create({
        name: req.body.name,
        image: req.file ? req.file.filename : null,
        info: req.body.info,
        isPublished: false,
      });
      return res.send(artist);
    } else {
      return res.status(403).send({message: 'You do not have permission to create'});
    }

  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const artist = await Artist.findById(req.params.id);
    if (artist && user.role === 'admin') {
      const artistAlbums = await Album.find({artist: req.params.id});
      if (artistAlbums.length > 0) {
        return res.status(403).send({message: 'You can\'t delete an artist if they have albums'});
      } else {
        await Artist.deleteOne({_id: req.params.id});
        const artists = await Artist.find();
        return res.send(artists);
      }
    } else {
      return res.status(403).send({message: 'There is no such artist or you do not have permission to delete'});
    }
  } catch (e) {
    next(e);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const artist: HydratedDocument<IArtist> | null = await Artist.findById(req.params.id);
    if (!artist) {
      return res.sendStatus(404);
    }

    artist.isPublished = !artist.isPublished;
    await artist.save();
    return res.send(artist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default artistsRouter;