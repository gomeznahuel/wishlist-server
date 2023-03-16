import express, { Express } from "express";
import { dbConnection } from "../../database";
import { listenServer, loadRoutes, middlewaresServer } from "./config";

class Server {
  private app: Express;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
  }

  private async connectDB() {
    dbConnection();
  }

  private middlewares() {
    middlewaresServer(this.app);
  }

  private routes() {
    loadRoutes(this.app);
  }

  private listen() {
    listenServer(this.app, this.port);
  }

  start() {
    this.connectDB();
    this.middlewares();
    this.routes();
    this.listen();
  }
}

export default Server;
