import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {createAlbum, deleteAlbum, fetchAlbums, updateAlbum} from "./albumsThunks";
import {IAlbum} from "../../types";

interface AlbumsState {
  albums: IAlbum[] | [];
  albumsLoading: boolean;
  update: boolean;
  create: boolean;
  delete: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  albumsLoading: false,
  update: false,
  create: false,
  delete: false,
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

    builder.addCase(updateAlbum.pending, (state) => {
      state.update = true;
    });
    builder.addCase(updateAlbum.fulfilled, (state) => {
      state.update = false;
    });
    builder.addCase(updateAlbum.rejected, (state) => {
      state.update = false;
    });

    builder.addCase(createAlbum.pending, (state) => {
      state.create = true;
    });
    builder.addCase(createAlbum.fulfilled, (state) => {
      state.create = false;
    });
    builder.addCase(createAlbum.rejected, (state) => {
      state.create = false;
    });

    builder.addCase(deleteAlbum.pending, (state) => {
      state.delete = true;
    });
    builder.addCase(deleteAlbum.fulfilled, (state) => {
      state.delete = false;
    });
    builder.addCase(deleteAlbum.rejected, (state) => {
      state.delete = false;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumsLoading = (state: RootState) => state.albums.albumsLoading;
export const selectAlbumDeleting = (state: RootState) => state.albums.delete;
export const selectAlbumCreating = (state: RootState) => state.albums.create;
export const selectAlbumUpdating = (state: RootState) => state.albums.update;

