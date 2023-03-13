import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {IArtist} from "../../types";
import {createArtist, deleteArtist, fetchArtists, updateArtist} from "./artistsThunks";

interface ArtistsState {
  artists: IArtist[] | [];
  artistsLoading: boolean;
  deleteArtist: boolean;
  createArtist: boolean;
  updateArtist: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  artistsLoading: false,
  deleteArtist: false,
  createArtist: false,
  updateArtist: false,
}

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.artistsLoading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
      state.artistsLoading = false;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.artistsLoading = false;
    });

    builder.addCase(deleteArtist.pending, (state) => {
      state.deleteArtist = true;
    });
    builder.addCase(deleteArtist.fulfilled, (state) => {
      state.deleteArtist = false;
    });
    builder.addCase(deleteArtist.rejected, (state) => {
      state.deleteArtist = false;
    });

    builder.addCase(createArtist.pending, (state) => {
      state.createArtist = true;
    });
    builder.addCase(createArtist.fulfilled, (state) => {
      state.createArtist = false;
    });
    builder.addCase(createArtist.rejected, (state) => {
      state.createArtist = false;
    });

    builder.addCase(updateArtist.pending, (state) => {
      state.updateArtist = true;
    });
    builder.addCase(updateArtist.fulfilled, (state) => {
      state.updateArtist = false;
    });
    builder.addCase(updateArtist.rejected, (state) => {
      state.updateArtist = false;
    });
  },
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectArtistsLoading = (state: RootState) => state.artists.artistsLoading;
export const deleteArtistLoading = (state: RootState) => state.artists.deleteArtist;
export const createArtistLoading = (state: RootState) => state.artists.createArtist;
export const updateArtistLoading = (state: RootState) => state.artists.updateArtist;
