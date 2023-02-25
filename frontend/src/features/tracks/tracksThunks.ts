import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ITrack} from "../../types";

export const fetchTracks = createAsyncThunk<ITrack[], string>(
  'tracks/fetchTracks',
  async (id) => {
    const response = await axiosApi.get<ITrack[]>('/tracks?album=' + id);
    return response.data;
  }
);