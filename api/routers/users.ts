import express from "express";
import {Error} from "mongoose";
import User from "../models/User";
import {OAuth2Client} from "google-auth-library";
import config from "../config";
import * as crypto from "crypto";
import {avatarsUpload} from "../multer";

const usersRouter = express.Router();

const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', avatarsUpload.single('avatar'), async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({message: 'Password or username is required!'});
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar: req.file ? req.file.filename : null,
    });

    user.generateToken();
    await user.save();

    return res.send({message: 'Registered successfully!', user});
  } catch (e) {

    if (e instanceof Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {


    const user = await User.findOne({username: req.body.username});

    if (!user) {
      return res.status(400).send({error: 'Username not found'});
    }
    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({error: 'Password is wrong'});
    }

    user.generateToken();
    await user.save();

    return res.send({message: 'Username and password correct!', user: user});
  } catch (e) {
    return next(e);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).send({error: 'Wrong google token'});
    }
    const email = payload["email"];
    const googleID = payload["sub"];
    const displayName = payload["name"];
    const avatar = payload["picture"];

    if (!email) {
      return res
        .status(400)
        .send({error: "Not enough user data to continue"});
    }

    let user = await User.findOne({googleID});

    if (!user) {
      user = new User({
        username: email,
        password: crypto.randomUUID(),
        googleID,
        displayName,
        avatar,
      });
    }

    user.generateToken();

    await user.save();
    return res.send({error: "Login with Google successful!", user});

  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    const success = {message: 'OK'};

    if (!token) {
      return res.send(success);
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.send(success);
    }

    user.generateToken();
    await user.save();
    return res.send(success);
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;