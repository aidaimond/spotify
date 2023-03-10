import React from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {Typography} from "@mui/material";
import ArtistForm from "./ArtistForm";
import {ArtistMutation} from "../../types";
import {createArtist} from "./artistsThunks";

const NewArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const onFormSubmit = async (mutation: ArtistMutation) => {
    await dispatch(createArtist(mutation));
    navigate('/');
  };

  return (
    <>
      <Typography variant="h4" sx={{mb: 2}}>New artist</Typography>
      <ArtistForm onSubmit={onFormSubmit}/>
    </>
  );
};

export default NewArtist;