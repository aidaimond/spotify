import mongoose from 'mongoose';
import config from './config';
import Artist from "./models/Artist";
import Album from "./models/Album";
import {Track} from "./models/Track";


const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [theBlackEyedPeas, imagineDragons] = await Artist.create({
      name: "The Black Eyed Peas",
      image: "fixtures/theBlackEyedPeas.jpeg",
      info: "American hip-hop group"
    },
    {name: "Imagine Dragons", image: "fixtures/dragons.jpeg", info: "Pop and rock group"});


  const [elephunk, monkeyBusiness, evolve, nightVision] = await Album.create({
      name: "Elephunk",
      artist: theBlackEyedPeas._id,
      yearOfIssue: 2003,
      image: "fixtures/elephunk.jpeg"
    },
    {
      name: "Monkey business",
      artist: theBlackEyedPeas._id,
      yearOfIssue: 2005,
      image: "fixtures/monkey.jpeg"
    },
    {
      name: "Evolve",
      artist: imagineDragons._id,
      yearOfIssue: 2017,
      image: "fixtures/evolve.jpeg"
    },
    {
      name: "Night Visions",
      artist: imagineDragons._id,
      yearOfIssue: 2012,
      image: "fixtures/nightVisions.jpeg"
    });


  await Track.create(
    {name: "Where is the love?", album: elephunk._id, duration: "4:33", number: 1},
    {name: "Hands up", album: elephunk._id, duration: "3:36", number: 2},
    {name: "Anxiety", album: elephunk._id, duration: "3:38", number: 3},
    {name: "Latin Girls", album: elephunk._id, duration: "6:18", number: 4},
    {name: "Shut Up", album: elephunk._id, duration: "4:56", number: 5},

    {name: "Like that?", album: monkeyBusiness._id, duration: "4:35", number: 1},
    {name: "Gone Going", album: monkeyBusiness._id, duration: "3:14", number: 2},
    {name: "My Humps", album: monkeyBusiness._id, duration: "5:27", number: 3},
    {name: "Union", album: monkeyBusiness._id, duration: "5:04", number: 4},
    {name: "My Style", album: monkeyBusiness._id, duration: "4:29", number: 5},

    {name: "Demons?", album: nightVision._id, duration: "2:56", number: 1},
    {name: "Working man", album: nightVision._id, duration: "3:55", number: 2},
    {name: "Every Night", album: nightVision._id, duration: "3:37", number: 3},
    {name: "Radioactive", album: nightVision._id, duration: "3:07", number: 4},
    {name: "Cover Up", album: nightVision._id, duration: "4:19", number: 5},

    {name: "Whatever It Takes", album: evolve._id, duration: "3:21", number: 1},
    {name: "Believer", album: evolve._id, duration: "3:24", number: 2},
    {name: "Thunder", album: evolve._id, duration: "3:07", number: 3},
    {name: "Yesterday", album: evolve._id, duration: "3:25", number: 4},
    {name: "Dancing In The Dark", album: evolve._id, duration: "3:53", number: 5});

  await db.close();
};

run().catch(console.error);
