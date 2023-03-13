export interface IArtist {
  name: string;
  image: string | null;
  info: string;
  _id: string;
  isPublished: boolean;
}

export interface IAlbum {
  name: string;
  artist: IArtist;
  yearOfIssue: number;
  image: string | null;
  _id: string;
  isPublished: boolean;
}

export interface ITrack {
  name: string;
  album: IAlbum;
  duration: string;
  _id: string;
  number: number;
  isPublished: boolean;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface ITrackHistory {
  artist: IArtist;
  datetime: string;
  track: ITrack;
  user: string;
  _id: string;
}

export interface AlbumMutation {
  name: string;
  artist: string;
  yearOfIssue: string;
  image: string | null;
}

export interface ArtistMutation {
  name: string;
  info: string;
  image: string | null;
}

export interface TrackMutation {
  album: string;
  name: string;
  duration: string;
  number: string;
}



