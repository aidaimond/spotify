export interface IArtist {
  name: string;
  image: string | null;
  info: string;
  _id: string;
}

export interface IAlbum {
  name: string;
  artist: IArtist;
  yearOfIssue: number;
  image: string | null;
  _id: string;
}

export interface ITrack {
  name: string;
  album: IAlbum;
  duration: string;
  _id: string;
  number: number;
}

