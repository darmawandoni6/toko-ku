import { Router } from "express";

import jwt from "@utils/jwt";

import controller from "./controller";

class Route {
  router: Router = Router();

  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.post("/setting", jwt.verifyAccessToken, controller.create);
    this.router.put("/setting/:id", jwt.verifyAccessToken, controller.edit);
    this.router.get("/setting/:fileUrl", jwt.verifyAccessToken, controller.openFile);
  }
}

const settingRouter = new Route().router;

export default settingRouter;
