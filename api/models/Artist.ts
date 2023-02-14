import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  info: String,
});

const Artist = mongoose.model('Artist', ArtistsSchema);

export default Artist;