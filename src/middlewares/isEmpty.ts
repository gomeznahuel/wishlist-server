import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../errors";

// Destructure HttpResponse
const { send } = HttpResponse;

const isEmpty = (req: Request, res: Response, next: NextFunction) => {
  const { title, description, price, url } = req.body;

  if (!title || !description || !price || !url) {
    return send(res, 400, "Please fill all the fields");
  }

  next();
};

export default isEmpty;
