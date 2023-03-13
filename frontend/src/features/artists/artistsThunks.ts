import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ArtistMutation} from "../../types";
import {RootState} from "../../app/store";

export const fetchArtists = createAsyncThunk(
  'artists/fetchArtists',
  async () => {
    const response = await axiosApi.get('/artists');
    return response.data;
  }
);

export const createArtist = createAsyncThunk<void, ArtistMutation>(
  'artists/create',
  async (mutation) => {
    const formData = new FormData();
    const keys = Object.keys(mutation) as (keyof ArtistMutation)[];
    keys.forEach(key => {
      const value = mutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post('/artists', formData);
  }
);
export const updateArtist = createAsyncThunk<void, string, { state: RootState }>(
  'artists/update',
  async (id, {getState}) => {
    const user = getState().users.user;
    if (user && user.role === 'admin') {
      await axiosApi.patch('/artists/' + id + '/togglePublished');
    }
  }
);

export const deleteArtist = createAsyncThunk<void, string, { state: RootState }>(
  'artists/delete',
  async (id, {getState}) => {
    const user = getState().users.user;
    if (user && user.role === 'admin') {
      await axiosApi.delete('/artists/' + id);
    }
  }
);
