import {Box, CircularProgress, Grid, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectAlbums, selectAlbumsLoading} from "./albumsSlice";
import {fetchAlbums} from "./albumsThunks";
import AlbumItem from "./AlbumItem";

const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const albumsLoading = useAppSelector(selectAlbumsLoading);
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbums(id));
    }
  }, [dispatch]);

  let artist = '';

  albums.map(album => {
    if(album.artist._id === id) {
      artist = album.artist.name;
    }
  });

  return (
    albumsLoading ?
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box> :
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">
            {artist}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        {albums.map(album => (
          <AlbumItem key={album._id} album={album}/>
        ))}
      </Grid>
    </Grid>
  );
}

export default Albums;