import { Request, Response, Router} from "express";
import { Wishlist } from "../models";
import { isValidObjectId } from "mongoose";
import { HttpResponse } from "../errors";
import { isEmpty } from "../middlewares";

// Create router
const WishlistRouter = Router();

// Destructure HttpResponse
const { send } = HttpResponse;

WishlistRouter.get("/", async (req: Request, res: Response) => {
  try {
    const wishlists = await Wishlist.find();
    return send(res, 200, wishlists);
  } catch (error) {
    return send(res, 500, "Error getting wishlists");
  }
});

WishlistRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const isValid = isValidObjectId(id);

  if (!isValid) return send(res, 400, "Invalid ID");

  try {
    const wishlist = await Wishlist.findById(id);
    return send(res, 200, wishlist);
  } catch (error) {
    return send(res, 500, "Error getting wishlist");
  }
}); 
  
WishlistRouter.post("/", isEmpty ,async (req: Request, res: Response) => {
  const { title, description, price, url } = req.body;

  // Create new wishlist
  const wishlist = new Wishlist({ title, description, price, url });

  try {
    const wishlistSaved = await wishlist.save();
    return send(res, 201, wishlistSaved);
  } catch (error) {
    return send(res, 500, "Error saving wishlist");
  }
});

export default WishlistRouter;
