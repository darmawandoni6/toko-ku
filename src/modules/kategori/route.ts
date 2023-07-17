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
      .route("/kategori")
      .post(jwt.verifyAccessToken, controller.create)
      .get(jwt.verifyAccessToken, controller.findAll);
    this.router
      .route("/kategori/:id")
      .delete(jwt.verifyAccessToken, controller.remove)
      .put(jwt.verifyAccessToken, controller.edit);
  }
}

const kategoriRouter = new Route().router;

export default kategoriRouter;
