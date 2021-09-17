
import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    // enum: 10,
    default: '',
  },
  address: {
    type: String,
    // minlength: 6,
    default: '',
  },
  profilePicture: {
    type: String,
  },

},{timestamps:true});

const User = model("User",UserSchema);
export default User;