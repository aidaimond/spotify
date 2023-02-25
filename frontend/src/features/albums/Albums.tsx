import {Grid, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectAlbums} from "./albumsSlice";
import {fetchAlbums} from "./albumsThunks";
import AlbumItem from "./AlbumItem";

const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbums(id));
    }
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">
            {id}
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