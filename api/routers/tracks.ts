import express from "express";
import {Track} from "../models/Track";
import mongoose, {HydratedDocument} from "mongoose";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import {ITrack} from "../types";
import user from "../middleware/user";

const tracksRouter = express.Router();

tracksRouter.get('/', user, async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    if (req.query.album) {

      if (user && user.role === 'admin') {
        const albumsTracks = await Track.find({album: req.query.album}).populate({
          path: "album",
          select: "name artist",
          populate: {
            path: "artist",
            select: "name",
          }
        }).sort('number');

        return res.send(albumsTracks);
      }

      const albumsTracks = await Track.find({album: req.query.album, isPublished: true}).populate({
        path: "album",
        select: "name artist",
        populate: {
          path: "artist",
          select: "name",
        }
      }).sort('number');

      return res.send(albumsTracks);
    }
    if (req.query.artist) {
      if (user && user.role === 'admin') {
        const albums = await Album.find({artist: req.query.artist});
        const idArray = albums.map(p => p._id);
        const tracks = await Track.find({album: idArray});
        return res.send(tracks);
      }
      const albums = await Album.find({ artist: req.query.artist, isPublished: true });
      const idArray = albums.map(p => p._id);
      const tracks = await Track.find({ album: idArray, isPublished: true });
      return res.send(tracks);
    }
    if(user && user.role === 'admin') {
      const tracks =  await Track.find();
      return res.send(tracks);
    }
    const tracks = await Track.find({isPublished: true});
    return res.send(tracks);
  } catch (e) {
    next(e);
  }
});

tracksRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.album || !req.body.duration) {
      return res.status(400).send({message: 'The name or album is required!'});
    }
    const user = (req as RequestWithUser).user;
    if (user) {
      const track = await Track.create({
        name: req.body.name,
        album: req.body.album,
        duration: req.body.duration,
        number: req.body.number,
        isPublished: false,
      });
      return res.send(track);
    } else {
      return res.status(403).send({message: 'You do not have permission to create'});
    }

  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    if (user) {
      await Track.deleteOne({_id: req.params.id});
      const tracks = await Track.find();
      return res.send(tracks);
    } else {
      return res.status(403).send({message: 'You do not have permission to delete'});
    }
  } catch (e) {
    next(e);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const track: HydratedDocument<ITrack> | null = await Track.findById(req.params.id);
    if (!track) {
      return res.sendStatus(404);
    }

    track.isPublished = !track.isPublished;

    await track.save();

    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default tracksRouter;