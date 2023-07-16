import { NextFunction, Request, Response } from "express";

import { ResBody } from "./interface";

class Controller {
  async Create(req: Request, res: Response, next: NextFunction) {
    try {
      const result: ResBody = {
        message: "success create",
        status: 200,
        data: null,
      };

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const result: ResBody = {
        message: "success find",
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
