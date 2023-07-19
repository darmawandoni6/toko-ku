import { Router } from "express";

import jwt from "@utils/jwt";

import controller from "./controller";

class Route {
  router: Router = Router();

  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.put("/beli-detail/:id", jwt.verifyAccessToken, controller.update);
  }
}

const beliDetailRouter = new Route().router;

export default beliDetailRouter;
