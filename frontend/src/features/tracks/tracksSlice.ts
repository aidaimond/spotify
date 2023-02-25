import {createSlice} from '@reduxjs/toolkit';
import {fetchTracks} from "./tracksThunks";
import {ITrack} from "../../types";
import {RootState} from "../../app/store";

interface TracksState {
  tracks: ITrack[] | [];
}

const initialState: TracksState = {
  tracks: [],
}

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      // state.registerLoading = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state, action) => {
      state.tracks = action.payload;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
//
    });
  },
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.tracks;