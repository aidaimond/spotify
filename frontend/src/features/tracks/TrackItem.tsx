import React from 'react';
import {Grid, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import {ITrack} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../users/usersSlice";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {createTrackHistory} from "./tracksThunks";

interface Props {
  track: ITrack;
}

const TrackItem: React.FC<Props> = ({track}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const trackHistorySubmit = async () => {
    await dispatch(createTrackHistory(track._id))
  };

  return (
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton>
          <ListItemIcon>
            <AudiotrackIcon />
          </ListItemIcon>
          <ListItemText>
            {track.number + '. ' + track.name + ' '}
            <span style={{opacity: 0.6}}>{track.duration}</span>
          </ListItemText>
          {user ?
            <ListItemIcon onClick={() => trackHistorySubmit()}>
              <PlayArrowIcon/>
            </ListItemIcon>
            : null}
        </ListItemButton>
      </List>
    </Grid>
  );
};

export default TrackItem;