import express from "express";
import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import album from "../models/Album";
import {Track} from "../models/Track";
import {TrackHistoryType, TrackType2} from "../types";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req, res, next) => {

  if(!req.body.track) {
    return res.status(400).send({message: 'Track is required!'});
  }
  const user = (req as RequestWithUser).user;
  const track: TrackType2 | null = await Track.findById(req.body.track).populate('album', 'artist');

  if (!track) {
    return res.status(404);
  }

  const trackHistoryData: TrackHistoryType = {
    user: user._id.toString(),
    track: req.body.track,
    datetime: new Date().toISOString(),
    artist: track.album.artist.toString(),
  }

  const trackHistory = new TrackHistory(trackHistoryData);

  try {
    await trackHistory.save();
    return res.send(trackHistory);

  } catch (e) {
    if(e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

trackHistoryRouter.get('/', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    const trackHistory = await TrackHistory.find({user: user._id}).sort({datetime: -1}).populate({path: 'track artist', select: 'name'});

    console.log(trackHistory);
    return res.send(trackHistory);
  } catch (e) {

    if(e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

export default trackHistoryRouter;