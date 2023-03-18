import { Request, Response, Router } from "express";
import { MySessionData } from "../models/server/config";
import { isAuth } from "../middlewares";
const router = Router();

// Counter & exercise 01.
router.get("/counter", (req: Request, res: Response) => {
  const sessionData = req.session as MySessionData;
  const { name } = req.query; 

  if (sessionData.counter) {
    sessionData.counter++;
    res.send(`Hello ${sessionData.name}, you have visited this page ${sessionData.counter} times!`);
  } else {
    sessionData.counter = 1;
    sessionData.name = name as string;
    res.send(`Hello! This is your first visit!`);
  }
}); 
 
// Login
router.get("/login", (req: Request, res: Response) => {
  const sessionData = req.session as MySessionData;
  const { username, password } = req.query;

  if (username === "admin" && password === "admin") {
    sessionData.login = true;
    res.json({ message: "Success" });
  } else {
    res.json({ message: "Error" });
  }
});

// Protected
router.get("/protected", isAuth, (req: Request, res: Response) => {
  res.json({ message: "You are logged in" });
});

// Logout
router.get("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({ message: "Error" });
    } else {
      res.clearCookie("connect.sid");
      res.json({ message: "Success" });
    }
  });
});

export default router;