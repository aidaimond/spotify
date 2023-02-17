import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import artistsRouter from "./routers/artists";
import albumsRouter from "./routers/albums";
import tracksRouter from "./routers/tracks";
import trackHistoryRouter from "./routers/trackHistory";
import usersRouter from "./routers/users";

const app = express();
const port = 8000;
app.use(cors());


app.use(express.json());
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/track_history', trackHistoryRouter);
app.use('/users', usersRouter);


const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect('mongodb://localhost/spotify');
  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};
run().catch(console.error);