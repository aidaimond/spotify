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
      const albumsTracks = user.role === 'admin' ? await Track.find({album: req.query.album}).populate({
        path: "album",
        select: "name artist",
        populate: {
          path: "artist",
          select: "name",
        }
      }).sort('number') :
        await Track.find({album: req.query.album, isPublished: true}).populate({
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
      const albums = user.role === 'admin' ? await Album.find({artist: req.query.artist}) : await Album.find({
        artist: req.query.artist,
        isPublished: true
      });
      const idArray = albums.map(p => p._id);
      const tracks = user.role === 'admin' ? await Track.find({album: idArray}) : await Track.find({album: idArray, isPublished: true});
      return res.send(tracks);
    }
    const tracks = user.role === 'admin' ? await Track.find() : await Track.find({isPublished: true});
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

    const track = await Track.create({
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
      number: req.body.number,
      isPublished: user.role === 'admin',
    });

    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    await Track.deleteOne({_id: req.params.id});
    const tracks = await Track.find();
    return res.send(tracks);

  } catch (e) {
    next(e);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const track: HydratedDocument<ITrack> | null = await Track.findById(req.query.id);
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