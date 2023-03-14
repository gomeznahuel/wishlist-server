import { Request, Response, Router } from "express";
import { UserModel } from "../models";
import { HttpResponse } from "../errors";
import { hashPassword } from "../lib/bcrypt";

// Create router
const registerRouter = Router();

// Destructure HttpResponse
const { send } = HttpResponse;

registerRouter.get("/", async (req: Request, res: Response) => {
  // Get the user registers from the database
  try {
    const users = await UserModel.find();
    return send(res, 200, users);
  } catch (error) {
    return send(res, 500, "Error getting users");
  }

});

registerRouter.post("/", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const user = new UserModel({ username, email, password: hashedPassword });

  try {
    const userSaved = await user.save();
    return send(res, 201, userSaved);
  } catch (error) {
    return send(res, 500, "Error saving user");
  }
});

export default registerRouter;
