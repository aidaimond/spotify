import {createSlice} from '@reduxjs/toolkit';
import {createTrack, deleteTrack, fetchTrackHistory, fetchTracks, updateTrack} from "./tracksThunks";
import {ITrack, ITrackHistory} from "../../types";
import {RootState} from "../../app/store";

interface TracksState {
  tracks: ITrack[] | [];
  tracksLoading: boolean;
  trackHistory: ITrackHistory[] | null;
  trackHistoryLoading: boolean;
  createTrack : boolean;
  deleteTrack: boolean;
  updateTrack: boolean;
}

const initialState: TracksState = {
  tracks: [],
  tracksLoading: false,
  trackHistory: null,
  trackHistoryLoading: false,
  createTrack: false,
  deleteTrack: false,
  updateTrack: false,
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

    builder.addCase(createTrack.pending, (state) => {
      state.createTrack = true;
    });
    builder.addCase(createTrack.fulfilled, (state) => {
      state.createTrack = false;
    });
    builder.addCase(createTrack.rejected, (state) => {
      state.createTrack = false;
    });

    builder.addCase(deleteTrack.pending, (state) => {
      state.deleteTrack = true;
    });
    builder.addCase(deleteTrack.fulfilled, (state) => {
      state.deleteTrack = false;
    });
    builder.addCase(deleteTrack.rejected, (state) => {
      state.deleteTrack = false;
    });

    builder.addCase(updateTrack.pending, (state) => {
      state.updateTrack = true;
    });
    builder.addCase(updateTrack.fulfilled, (state) => {
      state.updateTrack = false;
    });
    builder.addCase(updateTrack.rejected, (state) => {
      state.updateTrack = false;
    });
  },
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksLoading = (state: RootState) => state.tracks.tracksLoading;
export const selectTrackHistory = (state: RootState) => state.tracks.trackHistory;
export const selectTrackHistoryLoading = (state: RootState) => state.tracks.trackHistoryLoading;
export const selectDeleteLoading = (state: RootState) => state.tracks.deleteTrack;
export const selectUpdateLoading = (state: RootState) => state.tracks.updateTrack;
export const selectCreateLoading = (state: RootState) => state.tracks.createTrack;
