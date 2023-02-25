import {createSlice} from '@reduxjs/toolkit';
import {fetchTracks} from "./tracksThunks";
import {ITrack} from "../../types";
import {RootState} from "../../app/store";

interface TracksState {
  tracks: ITrack[] | [];
  tracksLoading: boolean;
}

const initialState: TracksState = {
  tracks: [],
  tracksLoading: false,
}

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.tracksLoading = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state, action) => {
      state.tracks = action.payload;
      state.tracksLoading = false;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.tracksLoading = false;
    });
  },
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksLoading = (state: RootState) => state.tracks.tracksLoading;
