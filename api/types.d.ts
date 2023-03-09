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
}

export interface TrackHistoryType {
  user: string;
  track: string;
  artist: string;
  datetime: string;
}

