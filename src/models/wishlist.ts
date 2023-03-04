import { model, Schema } from "mongoose";

interface IWishlist {
  title: string;
  description: string;
  price: number;
  url: string;
}

const WishlistSchema = new Schema<IWishlist>({
  title: { type: String, required: [true, "The title is required"] },
  description: { type: String, required: [true, "The description is required"] },
  price: { type: Number, required: [true, "The price is required"] },
  url: { type: String, required: [true, "The url is required"] },
});

// WishlistSchema.methods.toJSON = function () {
//   const { __v, ...wishlist } = this.toObject();
//   return wishlist;
// };

export default model("Wishlist", WishlistSchema);
