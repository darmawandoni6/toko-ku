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
      .route("/beli")
      .post(jwt.verifyAccessToken, controller.create)
      .get(jwt.verifyAccessToken, controller.findAll);
  }
}

const beliRouter = new Route().router;

export default beliRouter;
