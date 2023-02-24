import {Grid, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectArtists} from "./artistsSlice";
import {fetchArtists} from "./artistsThunks";
import ArtistItem from "./ArtistItem";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">
            Artists
          </Typography>
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