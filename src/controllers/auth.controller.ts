import { Request, Response } from "express";
import { HttpResponse } from "../errors";
import { comparePassword, hashPassword } from "../lib/bcrypt";
import { generateJwt } from "../lib/jwt";
import { UserModel } from "../models";

// Destructure HttpResponse
const { send } = HttpResponse;

const login = async (req: Request, res: Response) => {
  async (req: Request, res: Response) => {
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
  };
};

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // Check if the email already exists.
  const isExist = await UserModel.findOne({ email });
  if (isExist) return send(res, 400, "Email already exists");

  const hashedPassword = await hashPassword(password);
  const user = new UserModel({ username, email, password: hashedPassword });

  try {
    const userSaved = await user.save();
    return send(res, 201, userSaved);
  } catch (error) {
    return send(res, 500, "Error saving user");
  }
};

export { login, register };
