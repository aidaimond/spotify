import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchTrackHistory} from "./tracksThunks";
import {selectUser} from "../users/usersSlice";
import {Navigate} from "react-router-dom";
import {selectTrackHistory, selectTrackHistoryLoading} from "./tracksSlice";
import TrackHistoryItem from "./TrackHistoryItem";
import {Box, CircularProgress, Typography} from "@mui/material";

const TrackHistory = () => {

  const dispatch = useAppDispatch();
  useEffect(() => {
      dispatch(fetchTrackHistory());
  }, [dispatch]);

  const user = useAppSelector(selectUser);
  const trackHistory = useAppSelector(selectTrackHistory);
  const trackHistoryLoading = useAppSelector(selectTrackHistoryLoading);

  if(!user) {
    return <Navigate to={"/login"}/>
  }

  return (
    trackHistoryLoading ?
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box> :
    <>
      <Typography variant="h5" sx={{marginBottom: 3}}>
        {user ? " " + user.username[0].toUpperCase() + user.username.slice(1) : null} Track History
      </Typography>
      {trackHistory?.map(track => (
        <TrackHistoryItem trackHistory={track} key={track._id}/>
      ))}
    </>
  );
};

export default TrackHistory;