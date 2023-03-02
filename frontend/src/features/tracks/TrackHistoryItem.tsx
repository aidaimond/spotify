import React from 'react';
import {Grid, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import {ITrackHistory} from "../../types";
import dayjs from "dayjs";

interface Props {
  trackHistory: ITrackHistory;
}

const TrackHistoryItem: React.FC<Props> = ({trackHistory}) => {

  return (
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton>
          <ListItemIcon>
            <AudiotrackIcon />
          </ListItemIcon>
          <ListItemText>
            {trackHistory.artist.name + '. ' + trackHistory.track.name + ' '}
            <span style={{opacity: 0.6}}>{dayjs(trackHistory.datetime).format('DD.MM.YYYY HH:mm')}</span>
          </ListItemText>
        </ListItemButton>
      </List>
    </Grid>
  );
};

export default TrackHistoryItem;