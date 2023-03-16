import { Router} from "express";
import { isEmpty } from "../middlewares";
import { verify } from "../lib/jwt";
import { getWishlist, getWishlistById, createWishlist, updateWishlist, deleteWishlist } from "../controllers";

// Create router
const WishlistRouter = Router();

WishlistRouter.get("/", getWishlist);
WishlistRouter.get("/:id", getWishlistById);
WishlistRouter.post("/", isEmpty, createWishlist);
WishlistRouter.put("/:id", isEmpty, updateWishlist);
WishlistRouter.delete("/:id", verify, deleteWishlist);

export default WishlistRouter;
