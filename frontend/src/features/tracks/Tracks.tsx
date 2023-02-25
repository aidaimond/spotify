import {Grid, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchTracks} from "./tracksThunks";
import {selectTracks} from "./tracksSlice";
import TrackItem from "./TrackItem";

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);

  useEffect(() => {
    dispatch(fetchTracks());
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
        {tracks.map(track => (
          <TrackItem key={track._id} track={track}/>
        ))}
      </Grid>
    </Grid>
  );
}

export default Tracks;