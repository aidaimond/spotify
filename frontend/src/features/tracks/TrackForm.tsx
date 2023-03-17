import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, Grid, MenuItem, TextField, Typography} from '@mui/material';
import {TrackMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAlbums} from "../albums/albumsSlice";
import {fetchAlbums} from "../albums/albumsThunks";
import {createTrack} from "./tracksThunks";
import {useNavigate} from "react-router-dom";
import {selectCreateLoading} from "./tracksSlice";

const TrackForm = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const navigate = useNavigate();
  const creating = useAppSelector(selectCreateLoading);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const [state, setState] = useState<TrackMutation>({
    name: '',
    album: '',
    duration: '',
    number: ''
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createTrack(state));
    navigate('/');
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2} sx={{marginY: 2}}>
        <Typography variant="h4">
          Add new track
        </Typography>
        <Grid item xs>
          <TextField
            label="Track name"
            name="name"
            value={state.name}
            onChange={inputChangeHandler}
            required
            id="name"
          />
        </Grid>
        <Grid item xs>
          <TextField
            select
            label="Album"
            name="album"
            value={state.album}
            onChange={inputChangeHandler}
            required
            id="album"
          >
            <MenuItem value="" disabled>Please select artist</MenuItem>
            {albums.map((album) => (
              <MenuItem key={album._id} value={album._id}>{album.name}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            id="duration" label="Duration"
            value={state.duration}
            onChange={inputChangeHandler}
            name="duration"
            type="number"
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="number" label="Number"
            value={state.number}
            onChange={inputChangeHandler}
            name="number"
            type="number"
            inputProps={{min: 1, max: 10000000}}
            required
          />
        </Grid>
        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">
            {creating ? <CircularProgress/> : 'Create'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TrackForm;