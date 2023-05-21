import { Router } from "express";
import { CreateAccount } from "../controller/create-account";

const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my api!" });
});

// USER ROUTES
routes.post("/users", (req, res) => {
  new CreateAccount(req, res).execute();
});

export default routes;
