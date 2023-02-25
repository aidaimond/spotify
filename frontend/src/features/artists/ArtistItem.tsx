import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, Grid, IconButton, styled} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import noImageAvailable from '../../assets/images/noImageAvailable.jpg';
import {apiURL} from "../../constants";
import {IArtist} from "../../types";

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  artist: IArtist;
}

const ArtistItem: React.FC<Props> = ({artist}) => {
  let cardImage = noImageAvailable;

  if(artist.image) {
    cardImage = apiURL + '/' + artist.image;
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardHeader title={artist.name}/>
        <ImageCardMedia image={cardImage} title={artist.name}/>
        <CardActions>
          <IconButton component={Link} to={'/albums/' + artist._id}>
            <ArrowForwardIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistItem;