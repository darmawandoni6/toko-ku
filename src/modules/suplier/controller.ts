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
        alamat: Joi.string().required(),
        telpon: Joi.string().required(),
        status: Joi.boolean(),
      });

      const { value, error } = validation(req, schema);
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }

      const suplier = await service.create(value);
      if (suplier.error) {
        throw createHttpError.BadRequest(suplier.error);
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
  async update(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object<ReqBody>({
      nama: Joi.string().required(),
      alamat: Joi.string().required(),
      telpon: Joi.string().required(),
      status: Joi.boolean(),
    });

    const { value, error } = validation(req, schema);
    if (error || !value) {
      throw createHttpError.BadRequest(error);
    }

    const suplier = await service.update({ id: parseInt(req.params.id, 10), payload: value });
    if (suplier.error) {
      throw createHttpError.BadRequest(suplier.error);
    }

    try {
      const result: ResBody = {
        message: "success update",
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
      const suplier = await service.findAll();
      if (suplier.error) {
        throw createHttpError.BadRequest(suplier.error);
      }
      const result: ResBody = {
        message: "success findAll",
        status: 200,
        data: suplier.data,
      };

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
