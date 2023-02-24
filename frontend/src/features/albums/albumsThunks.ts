import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAll',
  async () => {
    const response = await axiosApi.get('/albums');
    return response.data;
  }
);