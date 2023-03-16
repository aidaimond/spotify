import {ObjectId} from "mongoose";

export interface TrackType {
  name: string;
  album: {
    artist: string;
  };
  duration: string;
  number: number;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName?: string;
  googleID?: string;
  avatar?: string;
}

export interface TrackHistoryType {
  user: string;
  track: string;
  artist: string;
  datetime: string;
}

export interface ITrack {
  _id: ObjectId;
  name: string;
  album: ObjectId;
  duration: string;
  number: number;
  isPublished: boolean;
}

export interface IAlbum {
  _id: ObjectId;
  name: string;
  artist: ObjectId;
  yearOfIssue: string;
  image: string;
  isPublished: boolean;
}

export interface IArtist {
  _id: ObjectId;
  name: string;
  image: string;
  info: string;
  isPublished: boolean;
}
