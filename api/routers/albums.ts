import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import mongoose, {HydratedDocument} from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import {Track} from "../models/Track";
import {IAlbum} from "../types";
import user from "../middleware/user";

const albumsRouter = express.Router();

albumsRouter.get('/', user, async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    if (req.query.artist) {
      if (user && user.role === 'admin') {
        const artistAlbums = await Album.find({artist: req.query.artist}).populate('artist', 'name').sort({yearOfIssue: -1});
        return res.send(artistAlbums);
      }
      const artistAlbums = await Album.find({artist: req.query.artist, isPublished: true
      }).populate('artist', 'name').sort({yearOfIssue: -1});
      return res.send(artistAlbums);
    } else {
      if (user && user.role === 'admin') {
        const album = await Album.find();
        return res.send(album);
      }
      const album = await Album.find({isPublished: true});
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
    const user = (req as RequestWithUser).user;
    if (user) {

      const album = await Album.create({
        name: req.body.name,
        artist: req.body.artist,
        yearOfIssue: parseFloat(req.body.yearOfIssue),
        image: req.file ? req.file.filename : null,
        isPublished: false,
      });

      return res.send(album);
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

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const album = await Album.findById(req.params.id);
    if (user && album) {
      const albumTracks = await Track.find({album: req.params.id});
      if (albumTracks.length > 0) {
        return res.status(403).send({message: 'You can\'t delete an album if they have tracks'});
      } else {
        await Album.deleteOne({_id: req.params.id});
        const albums = await Album.find();
        return res.send(albums);
      }
    } else {
      return res.status(403).send({message: 'There is no such album or you do not have permission to delete'});
    }
  } catch (e) {
    next(e);
  }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const album: HydratedDocument<IAlbum> | null = await Album.findById(req.params.id);
    if (!album) {
      return res.sendStatus(404);
    }
    album.isPublished = !album.isPublished;
    await album.save();
    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default albumsRouter;