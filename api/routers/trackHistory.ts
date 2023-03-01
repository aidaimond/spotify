import express from "express";
import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req, res, next) => {

  if(!req.body.track) {
    return res.status(400).send({message: 'Track is required!'});
  }
  const user = (req as RequestWithUser).user;

  const trackHistoryData = {
    user: user._id,
    track: req.body.track,
    datetime: new Date().toISOString(),
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

export default trackHistoryRouter;