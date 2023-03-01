export interface ArtistType {
  name: string;
  image: string | null;
  info: string;
}

export interface AlbumType {
  name: string;
  image: string | null;
  artist: string;
  yearOfIssue: string;
}

export interface TrackType {
  name: string;
  album: string;
  duration: string;
  number: number;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
}

