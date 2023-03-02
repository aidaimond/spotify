import {Box, CircularProgress, Grid, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchTracks} from "./tracksThunks";
import {selectTracks, selectTracksLoading} from "./tracksSlice";
import TrackItem from "./TrackItem";
import {useParams} from "react-router-dom";
import {selectAlbums} from "../albums/albumsSlice";

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const albums = useAppSelector(selectAlbums);
  const tracksLoading = useAppSelector(selectTracksLoading);
  const {id} = useParams();

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
          <Typography variant="h5" sx={{marginBottom: 3}}>
            {albums.length && albums[0].artist.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4">
            {tracks.length && tracks[0].album.name}
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