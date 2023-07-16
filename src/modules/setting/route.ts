import { Router } from "express";

import controller from "./controller";

class Route {
  router: Router = Router();

  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.post("/setting", controller.Create);
    this.router.route("/setting/:id").get(controller.findOne).put(controller.edit);
  }
}

const settingRouter = new Route().router;

export default settingRouter;
