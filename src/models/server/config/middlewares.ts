import express, { Express } from "express";
import isError from "../../../utils/isError";
import cookie from "cookie-parser";
import { Session } from "./session.cfg";

const middlewaresServer = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookie());
  app.use(Session);
  isError(app);
};

export default middlewaresServer;
 