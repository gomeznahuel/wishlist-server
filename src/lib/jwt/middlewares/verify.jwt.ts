import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import httpResponse from "../../../errors/http.response";

const { send } = httpResponse;

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"];

  if (!token) return send(res, 403, "No token provided");

  try {
    const decoded = jwt.verify(token as string, process.env.SECRETORPRIVATEKEY!);
    res.locals.jwtPayload = decoded;
    next();
  } catch (error) {
    return send(res, 401, "Unauthorized");
  }
};

export default verifyJWT;
