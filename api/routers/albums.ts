import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import {AlbumType} from "../types";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    if (req.query.artist) {
      const artistAlbums = await Album.find({artist: req.query.artist}).populate('artist', 'name').sort({yearOfIssue: -1});
      return res.send(artistAlbums);
    } else {
      const album = await Album.find();
      return res.send(album);
    }
  } catch (e) {
    next(e);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist', 'name image info');
    if (!album) {
      return res.status(404).send({message: 'Album is not found'});
    }
    return res.send(album);
  } catch (e) {
    next(e);
  }
});

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {

  if (!req.body.name || !req.body.artist || !req.body.yearOfIssue) {
    return res.status(404).send({message: 'Album name, year of issue or artist name is required'});
  }
  const albumData: AlbumType = {
    name: req.body.name,
    artist: req.body.artist,
    yearOfIssue: req.body.yearOfIssue,
    image: req.file ? req.file.filename : null,
  };
  const album = new Album(albumData);

  try {
    await album.save();
    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default albumsRouter;