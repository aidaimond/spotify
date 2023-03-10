import {Box, Button, CircularProgress, Grid, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectArtists, selectArtistsLoading} from "./artistsSlice";
import {fetchArtists} from "./artistsThunks";
import ArtistItem from "./ArtistItem";
import {selectUser} from "../users/usersSlice";
import {Link} from "react-router-dom";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const artistsLoading = useAppSelector(selectArtistsLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    artistsLoading ?
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box> :
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">
            Artists
          </Typography>
        </Grid>
        <Grid item>
          {user && (
            <Button color="primary" component={Link} to="/new-artist">
              Add artist
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        {artists.map(artist => (
          <ArtistItem key={artist._id} artist={artist}/>
        ))}
      </Grid>
    </Grid>
  );
}

export default Artists;