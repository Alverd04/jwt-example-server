import mongoose from "mongoose";

export interface User extends mongoose.Document {
  email: string;
  password: string;
  name: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const UserSchema = mongoose.model("User", userSchema);

export default UserSchema;
