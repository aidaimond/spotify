import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Grid,
  Icon,
  styled
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import noImageAvailable from '../../assets/images/noImageAvailable.jpg';
import {apiURL} from '../../constants';
import {IAlbum} from "../../types";
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../users/usersSlice";
import {deleteAlbum, fetchAlbums, updateAlbum} from "./albumsThunks";
import {selectAlbumDeleting, selectAlbumUpdating} from "./albumsSlice";

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  album: IAlbum;
}

const AlbumItem: React.FC<Props> = ({album}) => {
  let cardImage = noImageAvailable;
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const updating = useAppSelector(selectAlbumUpdating);
  const deleting = useAppSelector(selectAlbumDeleting);

  if (album.image) {
    cardImage = apiURL + '/' + album.image;
  }

  const remove = async (albumId: string) => {
    await dispatch(deleteAlbum(albumId));
    await dispatch(fetchAlbums(id));
  };

  const update = async (albumId: string) => {
    await dispatch(updateAlbum(albumId));
    await dispatch(fetchAlbums(id));
  };

  return (
    <Grid item xs={12} sm={6} md={5} lg={4}>
      <Card>
        <CardHeader title={album.name}/>
        <ImageCardMedia image={cardImage} title={album.name}/>
        <CardContent>
          <strong>
            Year of issue: {album.yearOfIssue}
          </strong>
        </CardContent>
        <CardActions style={{justifyContent: "space-between"}}>
          <Button variant="outlined" component={Link} to={'/tracks/' + album._id} endIcon={<ArrowForwardIcon/>}>
            Open
          </Button>
          {user && user.role === 'admin' ? (
            <>
              <Button variant="outlined" color="error" endIcon={<DeleteIcon/>} onClick={() => remove(album._id)}>
                {deleting ? <CircularProgress/> : 'Delete'}
              </Button>
              {album.isPublished ?
                <Icon>
                  <DownloadDoneIcon/>
                </Icon>
                :
                <>
                  <Button variant="outlined" color="success" endIcon={<PublishIcon/>} onClick={() => update(album._id)}>
                    {updating ? <CircularProgress/> : 'Publish'}
                  </Button>
                  <Icon>
                    <UnpublishedIcon/>
                  </Icon>
                </>
              }
            </>
          ) : null
          }
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumItem;