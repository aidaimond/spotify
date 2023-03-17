import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, Grid, MenuItem, TextField, Typography} from '@mui/material';
import FileInput from '../../components/UI/FileInput/FileInput';
import {AlbumMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchArtists} from "../artists/artistsThunks";
import {selectArtists} from "../artists/artistsSlice";
import {createAlbum} from "./albumsThunks";
import {useNavigate} from "react-router-dom";
import {selectAlbumCreating} from "./albumsSlice";

const AlbumForm = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const navigate = useNavigate();
  const creating = useAppSelector(selectAlbumCreating);

  const [state, setState] = useState<AlbumMutation>({
    name: '',
    artist: '',
    yearOfIssue: '',
    image: null,
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createAlbum(state));
    navigate('/');
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState(prevState => ({
      ...prevState, [name]: files && files[0] ? files[0] : null,
    }));
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2} sx={{marginY: 2}}>
        <Typography variant="h4">
          Add new album
        </Typography>
        <Grid item xs>
          <TextField
            label="Album title"
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
            label="Artist"
            name="artist"
            value={state.artist}
            onChange={inputChangeHandler}
            required
            id="artist"
          >
            <MenuItem value="" disabled>Please select artist</MenuItem>
            {artists.map((artist) => (
              <MenuItem key={artist._id} value={artist._id}>{artist.name}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            id="yearOfIssue" label="Year of Issue"
            value={state.yearOfIssue}
            onChange={inputChangeHandler}
            name="yearOfIssue"
            type="number"
            required
          />
        </Grid>
        <Grid item xs>
          <FileInput onChange={fileInputChangeHandler} name="image" label="Image"/>
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

export default AlbumForm;