import express from "express";
import {Track} from "../models/Track";
import mongoose from "mongoose";
import Album from "../models/Album";
import {imagesUpload} from "../multer";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try{
    if(req.query.album) {
      const albumTracks = await Track.find({album: req.query.album});
      return res.send(albumTracks);
    }
    if(req.query.artist) {
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

tracksRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  if (!req.body.name || !req.body.album || req.body.duration) {
    return res.status(400).send({message: 'The name or album is required!'});
  }

  const trackData = {
    name: req.body.name,
    album: req.body.album,
    duration: req.body.duration,
  };
  const track = new Track(trackData);

  try {
    await track.save();
    return res.send(track);
  }  catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

export default tracksRouter;