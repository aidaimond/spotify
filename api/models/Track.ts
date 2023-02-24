import mongoose, {Types} from "mongoose";
import Album from "./Album";

const Schema = mongoose.Schema;

const TracksSchema = new Schema ({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  album: {
    type:Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Album.findById(value),
      message: 'Album does not exist',
    }
  },
  duration: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  }
});

export const Track = mongoose.model('Track', TracksSchema);
