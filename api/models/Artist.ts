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
  isPublished: {
    type: Boolean,
    default: false,
}
});

const Artist = mongoose.model('Artist', ArtistsSchema);

export default Artist;