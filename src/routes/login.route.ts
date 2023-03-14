import { Request, Response, Router } from "express";
import { UserModel } from "../models";
import { HttpResponse } from "../errors";
import { comparePassword } from "../lib/bcrypt/";

// Create router
const loginRouter = Router();

// Destructure HttpResponse
const { send } = HttpResponse;

loginRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    return send(res, 200, users);
  } catch (error) {
    return send(res, 500, "Error getting users");
  }
});

loginRouter.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return send(res, 404, "User not found");

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) return send(res, 401, "Invalid password");

    return send(res, 200, user);
  } catch (error) {
    return send(res, 500, "Error logging in");
  }
});

export default loginRouter;
