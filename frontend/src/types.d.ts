export interface IArtist {
  name: string;
  image: string | null;
  info: string;
  _id: string;
}

export interface IAlbum {
  name: string;
  artist: string;
  yearOfIssue: number;
  image: string | null;
}

export interface ITrack {
  name: string;
  album: string;
  duration: string;
}

export interface IUser {
  username: string;
  password: string;
}
