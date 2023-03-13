import {Box, Button, CircularProgress, Grid, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectAlbums, selectAlbumsLoading} from "./albumsSlice";
import {fetchAlbums} from "./albumsThunks";
import AlbumItem from "./AlbumItem";
import {selectUser} from "../users/usersSlice";

const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const albumsLoading = useAppSelector(selectAlbumsLoading);
  const user = useAppSelector(selectUser);
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbums(id));
    }
  }, [dispatch, id]);

  return (
    albumsLoading ?
      <Box sx={{display: 'flex'}}>
        <CircularProgress/>
      </Box> :
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">
              {albums.length && albums[0].artist.name || null}
            </Typography>
          </Grid>
          <Grid item>
            {user && (
              <Button color="primary" component={Link} to="/new-album">
                Add album
              </Button>
            )}
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