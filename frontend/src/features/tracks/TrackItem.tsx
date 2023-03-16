import React from 'react';
import {Button, CircularProgress, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import {ITrack} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../users/usersSlice";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {createTrackHistory, deleteTrack, fetchTracks, updateTrack} from "./tracksThunks";
import {useParams} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import {selectDeleteLoading, selectUpdateLoading} from "./tracksSlice";

interface Props {
  track: ITrack;
}

const TrackItem: React.FC<Props> = ({track}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const {id} = useParams();
  const deleting = useAppSelector(selectDeleteLoading);
  const updating = useAppSelector(selectUpdateLoading);

  const remove = async (albumId: string) => {
    await dispatch(deleteTrack(albumId));
    await dispatch(fetchTracks(id));
  };

  const update = async (albumId: string) => {
    await dispatch(updateTrack(albumId));
    await dispatch(fetchTracks(id));
  };

  const trackHistorySubmit = async () => {
    await dispatch(createTrackHistory(track._id));
  };

  return (
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItem>
          <ListItemIcon>
            <AudiotrackIcon/>
          </ListItemIcon>
          <ListItemText>
            {track.number + '. ' + track.name + ' '}
            <span style={{opacity: 0.6}}>{track.duration}</span>
          </ListItemText>
          {user ?
            <IconButton onClick={() => trackHistorySubmit()}>
              <PlayArrowIcon/>
            </IconButton>
            : null}
          {user?.role === 'admin' ? (
            <>
              <Button endIcon={deleting ? <CircularProgress/> : <DeleteIcon/>} onClick={() => remove(track._id)}>
              </Button>
              {track.isPublished ?
                <IconButton>
                  <DownloadDoneIcon/>
                </IconButton> :
                <>
                  <IconButton onClick={() => update(track._id)}>
                    {updating ? <CircularProgress/> :
                      <PublishIcon/>}
                  </IconButton>
                  <IconButton>
                    <UnpublishedIcon/>
                  </IconButton>
                </>
              }
            </>
          ) : null
          }
        </ListItem>
      </List>
    </Grid>
  );
};

export default TrackItem;