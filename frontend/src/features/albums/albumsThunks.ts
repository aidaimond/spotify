import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {AlbumMutation, IAlbum} from "../../types";
import {RootState} from "../../app/store";

export const fetchAlbums = createAsyncThunk<IAlbum[], string | undefined>(
  'albums/fetchAlbums',
  async (id) => {
    if (id) {
      const response = await axiosApi.get<IAlbum[]>('/albums?artist=' + id);
      return response.data;
    } else {
      const response = await axiosApi.get<IAlbum[]>('/albums');
      return response.data;
    }
  }
);

export const createAlbum = createAsyncThunk<void, AlbumMutation>(
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

export const updateAlbum = createAsyncThunk<void, string, { state: RootState }>(
  'albums/update',
  async (id, {getState}) => {
    const user = getState().users.user;
    if (user && user.role === 'admin') {
      await axiosApi.patch('/albums/' + id + '/togglePublished');
    }
  }
);

export const deleteAlbum = createAsyncThunk<void, string, { state: RootState }>(
  'albums/delete',
  async (id, {getState}) => {
    const user = getState().users.user;
    if (user && user.role === 'admin') {
      await axiosApi.delete('/albums/' + id);
    }
  }
);