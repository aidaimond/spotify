import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";

export const fetchTracks = createAsyncThunk(
  'tracks/fetchTracks',
  async (id) => {
    const response = await axiosApi.get('/tracks');
    return response.data;
  }
);