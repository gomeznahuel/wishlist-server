import { Express, NextFunction, Request, Response } from "express";
import { HttpResponse } from "../errors";

const { send } = HttpResponse;

const isError = (app: Express) => {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      console.error(err);
      return send(res, 500, null, "Internal server error");
    }
    next();
  });
};

export default isError;
