import express from "express";
import {Error} from "mongoose";
import User from "../models/User";

const usersRouter = express.Router();

usersRouter.post ('/', async (req, res, next) => {

  if(!req.body.username || !req.body.password) {
    return res.status(400).send({message: 'Password or username is required!'});
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    user.generateToken();
    await user.save();
    return res.send({message: 'Registered successfully!', user});

  } catch (e) {

    if(e instanceof Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

usersRouter.post('/sessions', async (req, res) => {

  const user = await User.findOne({username: req.body.username});

  if (!user) {
    return res.status(400).send({error: 'Username not found'});
  }
  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(400).send({error: 'Password is wrong'});
  }

  user.generateToken();
  await  user.save();

  return res.send({message: 'Username and password correct!'});
});

export default usersRouter;