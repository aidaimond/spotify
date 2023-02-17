import express from "express";
import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";
import User from "../models/User";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
  const token = req.get('Authorization');

  if(!token) {
    return res.send(401).send({error: 'No token present'});
  }
  if(!req.body.track) {
    return res.status(400).send({message: 'Track is required!'});
  }

  const user = await User.findOne({token});

  if(!user) {
    return res.status(401).send({error: 'Wrong token!'});
  }
  const trackHistoryData = {
    user: user,
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

// usersRouter.post('/secret', async (req, res) => {
//   const token = req.get('Authorization');
//   if (!token) {
//     return res.status(401).send({error: 'No token present'});
//   }
//   const user = await User.findOne({token});
//
//   if (!user) {
//     return res.status(401).send({error: 'Wrong token!'});
//   }
//
//   return res.send({
//     message: 'Secret message',
//     username: user.username
//   });
// });