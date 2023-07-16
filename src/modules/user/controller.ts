import { NextFunction, Request, Response } from "express";

import { ResBody } from "./interface";
import service from "./service";

class Controller {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await service.findOne({ id: 1 });
      const result: ResBody = {
        message: "success register",
        status: 200,
        data: null,
      };
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result: ResBody = {
        message: "success login",
        status: 200,
        data: null,
      };

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const result: ResBody = {
        message: "success edit",
        status: 200,
        data: null,
      };

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
