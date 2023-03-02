import {createSlice} from '@reduxjs/toolkit';
import {fetchTrackHistory, fetchTracks} from "./tracksThunks";
import {ITrack, ITrackHistory} from "../../types";
import {RootState} from "../../app/store";

interface TracksState {
  tracks: ITrack[] | [];
  tracksLoading: boolean;
  trackHistory: ITrackHistory[] | null;
  trackHistoryLoading: boolean;
}

const initialState: TracksState = {
  tracks: [],
  tracksLoading: false,
  trackHistory: null,
  trackHistoryLoading: false,
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

    builder.addCase(fetchTrackHistory.pending, (state) => {
      state.trackHistoryLoading = true;
    });
    builder.addCase(fetchTrackHistory.fulfilled, (state, action) => {
      state.trackHistory = action.payload;
      state.trackHistoryLoading = false;
    });
    builder.addCase(fetchTrackHistory.rejected, (state) => {
      state.trackHistoryLoading = false;
    });
  },
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksLoading = (state: RootState) => state.tracks.tracksLoading;
export const selectTrackHistory = (state: RootState) => state.tracks.trackHistory;
export const selectTrackHistoryLoading = (state: RootState) => state.tracks.trackHistoryLoading;
