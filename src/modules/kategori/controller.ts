import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import Joi from "joi";

import { ReqBody, ResBody } from "./interface";
import service from "./service";
import { validation } from "./validation";

class Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object<ReqBody>({
        nama: Joi.string().required(),
      });

      const { value, error } = validation(req, schema);
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }

      const kategori = await service.create(value);
      if (kategori.error) {
        throw createHttpError.BadRequest(kategori.error);
      }
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
  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object<ReqBody>({
        nama: Joi.string().required(),
      });

      const { value, error } = validation(req, schema);
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }

      const kategori = await service.update({ id: parseInt(req.params.id, 10), payload: value });
      if (kategori.error) {
        throw createHttpError.BadRequest(kategori.error);
      }
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
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const kategori = await service.remove(parseInt(req.params.id, 10));
      if (kategori.error) {
        throw createHttpError.BadRequest(kategori.error);
      }
      const result: ResBody = {
        message: "success remove",
        status: 200,
        data: null,
      };

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const kategori = await service.findAll();
      if (kategori.error) {
        throw createHttpError.BadRequest(kategori.error);
      }
      const result: ResBody = {
        message: "success findAll",
        status: 200,
        data: kategori.data,
      };

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
