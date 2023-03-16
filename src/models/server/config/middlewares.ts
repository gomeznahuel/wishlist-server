import express, { Express } from "express";
import isError from "../../../utils/isError";

const middlewaresServer = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  isError(app);
};

export default middlewaresServer;