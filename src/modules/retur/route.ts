import { Router } from "express";

import jwt from "@utils/jwt";

import controller from "./controller";

class Route {
  router: Router = Router();

  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router
      .route("/retur")
      .post(jwt.verifyAccessToken, controller.create)
      .get(jwt.verifyAccessToken, controller.findAll);
    this.router.put("/retur/:id", jwt.verifyAccessToken, controller.update);
  }
}

const returRouter = new Route().router;

export default returRouter;
