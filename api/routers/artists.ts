import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import {ArtistType} from "../types";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
  try {
    const artist = await Artist.find();
    return res.send(artist);
  } catch {
    return res.sendStatus(500);
  }
});

artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  if(!req.body.name) {
    return res.status(400).send({error: 'Artist name is required'});
  }

  const artistData: ArtistType = {
    name: req.body.name,
    image: req.file ? req.file.filename : null,
    info: req.body.info,
  };
  const artist = new Artist(artistData);

  try {
    await artist.save();
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