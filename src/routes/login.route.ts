import { Request, Response, Router } from "express";
import { UserModel } from "../models";
import { HttpResponse } from "../errors";
import { comparePassword } from "../lib/bcrypt/";

// Generate token
import { generateJwt } from "../lib/jwt";

// Create router
const loginRouter = Router();

// Destructure HttpResponse
const { send } = HttpResponse;

loginRouter.get("/", async (req: Request, res: Response) => {
  const query = true

  try {
    const users = await UserModel.find({ status: query });
    
    if (users.length === 0) return send(res, 404, "Don't exist users");
    else return send(res, 200, users);
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

    const token = generateJwt(user.uid);
    return send(res, 200, { user, token });
  } catch (error) {
    return send(res, 500, "Error logging in");
  }
});

loginRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndUpdate(id, { status: false });

    if (!user || user.status === false) return send(res, 404, "User not found");
    else return send(res, 200, "User deleted");
  } catch (error) {
    return send(res, 500, "Error deleting user");
  }
});



export default loginRouter;
