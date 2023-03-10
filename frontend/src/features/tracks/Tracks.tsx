import {Box, Button, CircularProgress, Grid, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchTracks} from "./tracksThunks";
import {selectTracks, selectTracksLoading} from "./tracksSlice";
import TrackItem from "./TrackItem";
import {Link, useParams} from "react-router-dom";
import {selectUser} from "../users/usersSlice";

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const tracksLoading = useAppSelector(selectTracksLoading);
  const {id} = useParams();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if(id) {
      dispatch(fetchTracks(id));
    }
  }, [dispatch, id]);

  return (
    tracksLoading ?
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box> :
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="column">
        <Grid item>
          {user && (
            <Button color="primary" component={Link} to="/new-track">
              Add Track
            </Button>
          )}
        </Grid>
        <Grid item>
          <Typography variant="h5" sx={{marginBottom: 2}}>
            {tracks.length && tracks[0].album.artist.name || null}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">
            {tracks.length && tracks[0].album.name || null}
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