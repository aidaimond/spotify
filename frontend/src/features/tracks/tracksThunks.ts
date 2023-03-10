import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ITrack, ITrackHistory, TrackMutation} from "../../types";
import {RootState} from "../../app/store";

export const fetchTracks = createAsyncThunk<ITrack[], string>(
  'tracks/fetchTracks',
  async (id) => {
    const response = await axiosApi.get<ITrack[]>('/tracks?album=' + id);
    return response.data;
  }
);

export const createTrackHistory = createAsyncThunk<void, string, { state: RootState }>(
  'trackHistory/create',
  async (trackId, {getState}) => {
    const user = getState().users.user;

    if (user) {
      await axiosApi.post('/track_history', {track: trackId});
    }
  }
);

export const fetchTrackHistory = createAsyncThunk<ITrackHistory[], void, { state: RootState }>(
  'trackHistory/fetch',
  async (_, {getState}) => {
    const user = getState().users.user;
    if (user) {
      const response = await axiosApi.get('/track_history');
      return response.data;
    }
  }
);

export const createTrack = createAsyncThunk<void , TrackMutation> (
  'tracks/create',
  async (mutation) => {
   await axiosApi.post('/tracks', mutation);
  }
);