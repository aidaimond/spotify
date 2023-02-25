import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {IArtist} from "../../types";
import {fetchArtists} from "./artistsThunks";

interface ArtistsState {
  artists: IArtist[] | [];
  artistsLoading: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  artistsLoading: false,
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
  },
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectArtistsLoading = (state: RootState) => state.artists.artistsLoading;
