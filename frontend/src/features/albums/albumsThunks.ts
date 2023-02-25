import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {IAlbum} from "../../types";

export const fetchAlbums = createAsyncThunk<IAlbum[], string>(
  'albums/fetchAlbums',
  async (id) => {
    const response = await axiosApi.get<IAlbum[]>('/albums?artist=' + id);
    return response.data;
  }
);