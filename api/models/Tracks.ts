import mongoose, {Types} from "mongoose";
import Album from "./Albums";

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
  duration: String,
});

const Track = mongoose.model('Track', TracksSchema);
