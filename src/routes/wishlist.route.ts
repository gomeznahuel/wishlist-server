import { Request, Response, Router} from "express";
import { Wishlist } from "../models";
import { isValidObjectId } from "mongoose";
import { HttpResponse } from "../errors";
import { isEmpty } from "../middlewares";
import { verify } from "../lib/jwt";

// Create router
const WishlistRouter = Router();

// Destructure HttpResponse
const { send } = HttpResponse;

WishlistRouter.get("/", async (req: Request, res: Response) => {
  try {
    const wishlists = await Wishlist.find();
    return res.status(200).json(wishlists);
  } catch (error) {
    return send(res, 500, "Error getting wishlists")
  }
});

WishlistRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const isValid = isValidObjectId(id);

  if (!isValid) return send(res, 400, "Invalid ID");

  try {
    const wishlist = await Wishlist.findById(id);
    return res.status(200).json(wishlist);
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
    return res.status(201).json(wishlistSaved);
  } catch (error) {
    return send(res, 500, "Error saving wishlist");
  }
});

WishlistRouter.put("/:id", isEmpty, async (req: Request, res: Response) => {
  const { id } = req.params;
  const isValid = isValidObjectId(id);

  if (!isValid) return send(res, 400, "Invalid ID");

  const { title, description, price, url } = req.body;

  try {
    const wishlist = await Wishlist.findByIdAndUpdate( id, { title, description, price, url }, { new: true });

    if (!wishlist) return send(res, 404, "Wishlist not found");
    else return res.status(200).json(wishlist);
  } catch (error) {
    return send(res, 500, "Error updating wishlist");
  }
});

WishlistRouter.delete("/:id", verify, async (req: Request, res: Response) => {
  const { id } = req.params;
  const isValid = isValidObjectId(id);

  if (!isValid) return send(res, 400, "Invalid ID");

  try {
    const wishlist = await Wishlist.findByIdAndDelete(id);

    if (!wishlist) return send(res, 404, "Wishlist not found");
    else return res.status(200).json(wishlist);
  } catch (error) {
    return send(res, 500, "Error deleting wishlist");
  }
});

export default WishlistRouter;
