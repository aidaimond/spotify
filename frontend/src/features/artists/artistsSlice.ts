import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {IArtist} from "../../types";
import {fetchArtists} from "./artistsThunks";

interface ArtistsState {
  artists: IArtist[] | [];
}

const initialState: ArtistsState = {
  artists: []
}

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      // state.registerLoading = true;
      // state.registerError = null;
    });
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      // state.registerLoading = false;
      // state.registerError = error || null;
    });
  },
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.artists;