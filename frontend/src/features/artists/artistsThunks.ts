import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ArtistMutation} from "../../types";

export const fetchArtists = createAsyncThunk(
  'artists/fetchArtists',
  async () => {
    const response = await axiosApi.get('/artists');
    return response.data;
  }
);

export const createArtist = createAsyncThunk <void, ArtistMutation>(
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