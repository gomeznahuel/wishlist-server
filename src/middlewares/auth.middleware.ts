import { NextFunction, Request, Response } from "express";
import { MySessionData } from "../models/server/config";

const isAuth = (req: Request, res: Response, next: NextFunction): void => {
  const sessionData = req.session as MySessionData;
  if (sessionData.login) {
    req.session.touch(); 
    next()
  } else res.json({ message: "You are not logged in" });
};

export default isAuth;