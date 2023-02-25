import React from 'react';
import {Grid, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import {ITrack} from "../../types";

interface Props {
  track: ITrack;
}

const TrackItem: React.FC<Props> = ({track}) => {

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton>
          <ListItemIcon>
            <AudiotrackIcon />
          </ListItemIcon>
          <ListItemText>
            {track.name + ' '}
            <span style={{opacity: 0.6}}>{track.duration}</span>
          </ListItemText>
        </ListItemButton>
      </List>
    </Grid>
  );
};

export default TrackItem;