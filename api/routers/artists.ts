import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose, {HydratedDocument} from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Album from "../models/Album";
import {Track} from "../models/Track";
import {IArtist} from "../types";
import user from "../middleware/user";

const artistsRouter = express.Router();

artistsRouter.get('/', user, async (req, res) => {

  const user = (req as RequestWithUser).user;

  try {
      const artist = user.role === 'admin' ? await Artist.find() :  await Artist.find({isPublished: true});
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

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const artistAlbums = await Album.find({artist: req.params.id});
    for(let i = 0; i < artistAlbums.length; i++) {
      const albumTracks = await Track.find({album: artistAlbums[i]._id});
      for (let i = 0; i < albumTracks.length; i++) {
        await Track.deleteOne({_id: albumTracks[i]._id});
        await Album.deleteOne({_id: artistAlbums[i]._id});
      }
    }
    await Artist.deleteOne({_id: req.params.id});
    const artists = await Artist.find();
    return res.send(artists);

  } catch (e) {
    next(e);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const artist: HydratedDocument<IArtist> | null = await Artist.findById(req.query.id);
    if(!artist) {
      return res.sendStatus(404);
    }

    artist.isPublished = !artist.isPublished;
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