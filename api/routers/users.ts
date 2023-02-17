import express from "express";
import {Error} from "mongoose";
import User from "../models/User";

const usersRouter = express.Router();

usersRouter.post ('/', async (req, res, next) => {
  try{
    const user = new User({
      username: req.body.username as string,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();
    return res.send(user);

  } catch (e) {
    if(e instanceof Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});