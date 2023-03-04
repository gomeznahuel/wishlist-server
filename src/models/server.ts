import express, { Express } from "express";
import dbConnection from "../database/db.config";

class Server {
  private app: Express;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api", require("../routes/wishlist.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  start() {
    this.connectDB();
    this.middlewares();
    this.routes();
    this.listen();
  }
}

module.exports = Server;
