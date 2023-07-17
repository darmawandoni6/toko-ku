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
      .route("/suplier")
      .post(jwt.verifyAccessToken, controller.create)
      .get(jwt.verifyAccessToken, controller.findAll);
    this.router.put("/suplier/:id", jwt.verifyAccessToken, controller.update);
  }
}

const suplierRouter = new Route().router;

export default suplierRouter;
