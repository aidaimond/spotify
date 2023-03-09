import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
  try {
    const artist = await Artist.find();
    return res.send(artist);
  } catch {
    return res.sendStatus(500);
  }
});

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({error: 'Artist name is required'});
    }
    const user = (req as RequestWithUser).user;

    const artist = await Artist.create({
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      info: req.body.info,
      isPublished: user.role === 'admin',
    });
    return res.send(artist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});



export default artistsRouter;