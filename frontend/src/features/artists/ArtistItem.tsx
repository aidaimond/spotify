import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, CardActions, CardHeader, CardMedia, CircularProgress, Grid, Icon, styled} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import noImageAvailable from '../../assets/images/noImageAvailable.jpg';
import {apiURL} from "../../constants";
import {IArtist} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../users/usersSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import {deleteArtist, fetchArtists, updateArtist} from "./artistsThunks";
import {deleteArtistLoading, updateArtistLoading} from "./artistsSlice";

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  artist: IArtist;
}

const ArtistItem: React.FC<Props> = ({artist}) => {
  let cardImage = noImageAvailable;
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const deleting = useAppSelector(deleteArtistLoading);
  const updating = useAppSelector(updateArtistLoading);

  if (artist.image) {
    cardImage = apiURL + '/' + artist.image;
  }

  const remove = async (id: string) => {
    await dispatch(deleteArtist(id));
    await dispatch(fetchArtists());
  };

  const update = async (id: string) => {
    await dispatch(updateArtist(id));
    await dispatch(fetchArtists());
  };

  return (
    <Grid item xs={12} sm={6} md={5} lg={4}>
      <Card>
        <CardHeader title={artist.name}/>

        <ImageCardMedia image={cardImage} title={artist.name}/>
        <CardActions style={{justifyContent: "space-between"}}>
          <Button variant="outlined" component={Link} to={'/albums/' + artist._id} endIcon={<ArrowForwardIcon/>}>
            Open
          </Button>
          {user && user.role === 'admin' ? (
            <>
              <Button variant="outlined" color="error" endIcon={<DeleteIcon/>} onClick={() => remove(artist._id)}>
                {deleting ? <CircularProgress/> : 'Delete'}
              </Button>
              {artist.isPublished ?
                <Icon>
                  <DownloadDoneIcon/>
                </Icon>
                :
                <>
                  <Button variant="outlined" color="success" endIcon={<PublishIcon/>}
                          onClick={() => update(artist._id)}>
                    {updating ? <CircularProgress/> : 'Publish'}
                  </Button>
                  <Icon>
                    <UnpublishedIcon/>
                  </Icon>
                </>
              }
            </>) : null
          }
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistItem;