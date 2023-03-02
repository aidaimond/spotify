import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchTrackHistory} from "./tracksThunks";
import {selectUser} from "../users/usersSlice";
import {Navigate} from "react-router-dom";
import {selectTrackHistory} from "./tracksSlice";
import TrackHistoryItem from "./TrackHistoryItem";
import {Typography} from "@mui/material";

const TrackHistory = () => {

  const dispatch = useAppDispatch();
  useEffect(() => {
      dispatch(fetchTrackHistory());
  }, [dispatch]);

  const user = useAppSelector(selectUser);
  const trackHistory = useAppSelector(selectTrackHistory);

  if(!user) {
    return <Navigate to={"/login"}/>
  }

  return (
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