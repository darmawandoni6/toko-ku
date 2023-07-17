import { Router } from "express";

import jwt from "@utils/jwt";

import controller from "./controller";

class Route {
  router: Router = Router();

  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.post("/register", controller.register);
    this.router.post("/login", controller.login);
    this.router.put("/user/:id", controller.edit);
    this.router.get("/user", jwt.verifyAccessToken, controller.profile);
  }
}

const userRouter = new Route().router;

export default userRouter;
