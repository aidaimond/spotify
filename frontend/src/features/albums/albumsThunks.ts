import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {AlbumMutation, IAlbum} from "../../types";

export const fetchAlbums = createAsyncThunk<IAlbum[], string | undefined>(
  'albums/fetchAlbums',
  async (id) => {
    if(id) {
      const response = await axiosApi.get<IAlbum[]>('/albums?artist=' + id);
      return response.data;
    } else {
      const response = await axiosApi.get<IAlbum[]>('/albums');
      return response.data;
    }
  }
);

export const createAlbum = createAsyncThunk<void , AlbumMutation> (
  'albums/create',
  async (mutation) => {
    const formData = new FormData();
    const keys = Object.keys(mutation) as (keyof AlbumMutation)[];
    keys.forEach(key => {
      const value = mutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post('/albums', formData);
  }
);