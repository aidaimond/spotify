import React, {useState} from 'react';
import {Button, Grid, TextField} from '@mui/material';
import FileInput from '../../components/UI/FileInput/FileInput';
import {ArtistMutation} from "../../types";

interface Props {
  onSubmit: (mutation: ArtistMutation) => void;
}

const ArtistForm: React.FC<Props> = ({onSubmit}) => {

  const [state, setState] = useState<ArtistMutation>({
    name: '',
    info: '',
    image: null,
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
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
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            label="Artist Name"
            name="name"
            value={state.name}
            onChange={inputChangeHandler}
            required
            id="name"
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="info" label="Information"
            value={state.info}
            onChange={inputChangeHandler}
            name="info"
            required
          />
        </Grid>
        <Grid item xs>
          <FileInput onChange={fileInputChangeHandler} name="image" label="Image"/>
        </Grid>
        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">Create</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ArtistForm;