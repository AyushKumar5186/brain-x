import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // firstName: {
  //   type: String,
  //   required: false,
  // },
  // lastName: {
  //   type: String,
  //   required: false,
  // },
  // image: {
  //   type: String,
  //   requierd: false,
  // },
  // profileSetup: {
  //   type: Boolean,
  //   default: false,
  // },
});

export const UserModel = mongoose.model("User", UserSchema);


