import { model, Schema } from "mongoose";
import { Props } from "./wishlist.types";
import { reusableSchemaMethods } from "./utils";

const WishlistSchema = new Schema<Props>({
  id: { type: String },
  title: { type: String, required: [true, "The title is required"] },
  description: { type: String, required: [true, "The description is required"] },
  price: { type: Number, required: [true, "The price is required"] },
  url: { type: String, required: [true, "The url is required"] },
});

// Delete __v from response.
reusableSchemaMethods(WishlistSchema);

export default model<Props>("Wishlist", WishlistSchema);