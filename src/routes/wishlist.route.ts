import { Request, Response } from "express";
import { Router } from "express";
import Wishlist from "../models/wishlist";

// Create router
const wishlistRouter = Router();

wishlistRouter.get("/", async (req: Request, res: Response) => {
  try {
    const wishlists = await Wishlist.find();
    res.json( wishlists );
  } catch (error) {
    console.log(error);
  }
  res.json({ message: "Hello World" });
});

wishlistRouter.post("/", async (req: Request, res: Response) => {
  const { title, description, price, url } = req.body;

  const wishlist = new Wishlist({ title, description, price, url });
  await wishlist.save();
  res.json({ status: "Wishlist saved", wishlist });
});

module.exports = wishlistRouter;

// Monday, Wendesday and Friday.