import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {fetchAlbums} from "./albumsThunks";
import {IAlbum} from "../../types";

interface AlbumsState {
  albums: IAlbum[] | [];
}

const initialState: AlbumsState = {
  albums: [],
}

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      // state.registerLoading = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
     state.albums = action.payload;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {

    });
  },
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.albums;
