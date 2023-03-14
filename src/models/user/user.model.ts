import { model, Schema } from "mongoose";
import { UserProps } from "./user.types";
import { reusableSchemaMethods } from "../wishlist/utils";

const UserSchema = new Schema<UserProps>({
  uid: { type: String },
  username: { type: String, required: [true, "The username is required"] },
  email: { type: String, required: [true, "The email is required"] },
  password: { type: String, required: [true, "The password is required"] },
  status: { type: Boolean, default: true },
});

// Delete __v from response.
reusableSchemaMethods(UserSchema);

export default model<UserProps>("Register", UserSchema);
