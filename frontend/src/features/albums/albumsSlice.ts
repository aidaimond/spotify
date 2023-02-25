import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {fetchAlbums} from "./albumsThunks";
import {IAlbum} from "../../types";

interface AlbumsState {
  albums: IAlbum[] | [];
  albumsLoading: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  albumsLoading: false,
}

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.albumsLoading = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
     state.albums = action.payload;
     state.albumsLoading = false;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.albumsLoading = false;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumsLoading = (state: RootState) => state.albums.albumsLoading;

