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
      .route("/barang")
      .post(jwt.verifyAccessToken, controller.create)
      .get(jwt.verifyAccessToken, controller.findAll);
    this.router
      .route("/barang/:id")
      .put(jwt.verifyAccessToken, controller.update)
      .delete(jwt.verifyAccessToken, controller.remove);
  }
}

const barangRouter = new Route().router;

export default barangRouter;
