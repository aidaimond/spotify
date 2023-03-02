import express from "express";
import {Track} from "../models/Track";
import mongoose from "mongoose";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import {TrackType} from "../types";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try{
    if(req.query.album) {
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

  const trackData: TrackType = {
    name: req.body.name,
    album: req.body.album,
    duration: req.body.duration,
    number: req.body.number,
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