import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, styled } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import noImageAvailable from '../../assets/images/noImageAvailable.jpg';
import { apiURL } from '../../constants';
import {IAlbum} from "../../types";

const ImageCardMedia = styled(CardMedia) ({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  album: IAlbum;
}

const AlbumItem: React.FC<Props> = ({album}) => {
  let cardImage = noImageAvailable;

  if(album.image) {
    cardImage = apiURL + '/' + album.image;
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardHeader title={album.name}/>
        <ImageCardMedia image={cardImage} title={album.name}/>
        <CardContent>
          <strong>
            Year of issue: {album.yearOfIssue}
          </strong>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={'/tracks/' + album._id}>
            <ArrowForwardIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumItem;