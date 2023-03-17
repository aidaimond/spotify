import mongoose from 'mongoose';
import config from './config';
import Artist from "./models/Artist";
import Album from "./models/Album";
import {Track} from "./models/Track";
import crypto from "crypto";
import User from "./models/User";


const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  await User.create({username: "user", password: "1qaz2wsx", token: crypto.randomUUID(), role: 'admin', displayName: "User", avatar: "fixtures/user.jpeg"});
  await User.create({username: "attractor", password: "2wsx3edc", token: crypto.randomUUID(), role: 'user', displayName: "Attractor", avatar: "fixtures/attractor.jpeg"});

  const [theBlackEyedPeas, imagineDragons, jayZ] = await Artist.create({
      name: "The Black Eyed Peas",
      image: "fixtures/theBlackEyedPeas.jpeg",
      info: "American hip-hop group",
      isPublished: true,
    },
    {name: "Imagine Dragons", image: "fixtures/dragons.jpeg", info: "Pop and rock group", isPublished: true},
    {name: "Jay-Z", image: "fixtures/jayZ.jpeg", info: "American rapper, songwriter, music producer", isPublished: false});


  const [elephunk, monkeyBusiness, evolve, nightVision, bluePrint] = await Album.create({
      name: "Elephunk",
      artist: theBlackEyedPeas._id,
      yearOfIssue: 2003,
      image: "fixtures/elephunk.jpeg",
      isPublished: true,
    },
    {
      name: "Monkey business",
      artist: theBlackEyedPeas._id,
      yearOfIssue: 2005,
      image: "fixtures/monkey.jpeg", isPublished: true
    },
    {
      name: "Evolve",
      artist: imagineDragons._id,
      yearOfIssue: 2017,
      image: "fixtures/evolve.jpeg",
      isPublished: true,
    },
    {
      name: "Night Visions",
      artist: imagineDragons._id,
      yearOfIssue: 2012,
      image: "fixtures/nightVisions.jpeg",
      isPublished: true,
    },
    {
      name: "The Blueprint 3",
      artist: jayZ._id,
      yearOfIssue: 2009,
      image: "fixtures/bluePrint.jpeg",
      isPublished: false,
    });


  await Track.create(
    {name: "Where is the love?", album: elephunk._id, duration: "4:33", number: 1, isPublished: true},
    {name: "Hands up", album: elephunk._id, duration: "3:36", number: 2, isPublished: true},
    {name: "Anxiety", album: elephunk._id, duration: "3:38", number: 3, isPublished: true},
    {name: "Latin Girls", album: elephunk._id, duration: "6:18", number: 4, isPublished: true},
    {name: "Shut Up", album: elephunk._id, duration: "4:56", number: 5, isPublished: true},

    {name: "Like that", album: monkeyBusiness._id, duration: "4:35", number: 1, isPublished: true},
    {name: "Gone Going", album: monkeyBusiness._id, duration: "3:14", number: 2, isPublished: true},
    {name: "My Humps", album: monkeyBusiness._id, duration: "5:27", number: 3, isPublished: true},
    {name: "Union", album: monkeyBusiness._id, duration: "5:04", number: 4, isPublished: true},
    {name: "My Style", album: monkeyBusiness._id, duration: "4:29", number: 5, isPublished: true},

    {name: "Demons", album: nightVision._id, duration: "2:56", number: 1, isPublished: true},
    {name: "Working man", album: nightVision._id, duration: "3:55", number: 2, isPublished: true},
    {name: "Every Night", album: nightVision._id, duration: "3:37", number: 3, isPublished: true},
    {name: "Radioactive", album: nightVision._id, duration: "3:07", number: 4, isPublished: true},
    {name: "Cover Up", album: nightVision._id, duration: "4:19", number: 5, isPublished: true},

    {name: "Whatever It Takes", album: evolve._id, duration: "3:21", number: 1, isPublished: true},
    {name: "Believer", album: evolve._id, duration: "3:24", number: 2, isPublished: true},
    {name: "Thunder", album: evolve._id, duration: "3:07", number: 3, isPublished: true},
    {name: "Yesterday", album: evolve._id, duration: "3:25", number: 4, isPublished: true},
    {name: "Dancing In The Dark", album: evolve._id, duration: "3:53", number: 5, isPublished: true},


    {name: "Empire State of Mind", album: bluePrint._id, duration: "4:37", number: 1, isPublished: false},
    {name: "Young Forever", album: bluePrint._id, duration: "4:14", number: 2, isPublished: false},
    {name: "Off That", album: bluePrint._id, duration: "4:07", number: 3, isPublished: false});

  await db.close();
};

run().catch(console.error);
