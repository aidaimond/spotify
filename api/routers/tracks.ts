import express from "express";
import {Track} from "../models/Track";
import mongoose from "mongoose";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    if (req.query.album) {
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
    if (req.query.artist) {
      const albums = await Album.find({artist: req.query.artist});
      const idArray = albums.map(p => p._id);
      const tracks = await Track.find({album: idArray});
      return res.send(tracks);
    }
    const tracks = await Track.find();
    return res.send(tracks);
  } catch (e) {
    next(e);
  }
});

tracksRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.album || req.body.duration) {
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

export default tracksRouter;