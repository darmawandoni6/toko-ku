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
        qty: Joi.number().min(1).required(),
        harga: Joi.number().min(1).required(),
        keterangan: Joi.string().required(),
        barangId: Joi.number().required(),
      });

      const { value, error } = validation(req, schema);
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }

      const retur = await service.create(value);
      if (retur.error) {
        throw createHttpError.BadRequest(retur.error);
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
    try {
      const schema = Joi.object<ReqBody>({
        qty: Joi.number().min(1).required(),
        harga: Joi.number().min(1).required(),
        keterangan: Joi.string().required(),
        barangId: Joi.number().required(),
      });

      const { value, error } = validation(req, schema);
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }

      const retur = await service.update({ id: parseInt(req.params.id, 10), payload: value });
      if (retur.error) {
        throw createHttpError.BadRequest(retur.error);
      }

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
      const retur = await service.findAll();
      if (retur.error) {
        throw createHttpError.BadRequest(retur.error);
      }

      const result: ResBody = {
        message: "success find all",
        status: 200,
        data: retur.data,
      };

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
