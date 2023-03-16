import { Request, Response, Router } from "express";
const logoutRouter = Router();

logoutRouter.get("/", (req: Request, res: Response) => {
  res.send("Logout route");
});

export default logoutRouter;
