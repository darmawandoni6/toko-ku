import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import Joi from "joi";

import { ReqBody, ResBody } from "./interface";
import service from "./service";
import { validation } from "./validation";

class Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = res.locals;
      const schema = Joi.object<ReqBody>({
        nama: Joi.string().required(),
        hargaPokok: Joi.number().min(1).required(),
        hargaJual: Joi.number().min(1).required(),
        stok: Joi.number().required(),
        status: Joi.boolean(),
        kategoriId: Joi.number().required(),
        userId: Joi.number(),
      });

      const { value, error } = validation({ req, schema });
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }
      value.userId = userId;
      const barang = await service.create(value);
      if (barang.error) {
        throw createHttpError.BadRequest(barang.error);
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
        nama: Joi.string(),
        hargaPokok: Joi.number().min(1),
        hargaJual: Joi.number().min(1),
        stok: Joi.number().min(1),
        status: Joi.boolean(),
        kategoriId: Joi.number(),
        userId: Joi.number(),
      });

      const { value, error } = validation({ req, schema });
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }

      const barang = await service.update({ id: parseInt(req.params.id, 10), payload: value });
      if (barang.error) {
        throw createHttpError.BadRequest(barang.error);
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
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = res.locals;
      const find = await service.findOne({ id: parseInt(req.params.id, 10), userId });
      if (find.error) {
        throw createHttpError.BadRequest(find.error);
      }
      if (!find.data) {
        throw createHttpError.NotFound();
      }

      const payload: ReqBody = find.data as ReqBody;
      payload.status = false;

      const barang = await service.update({
        id: parseInt(req.params.id, 10),
        payload,
      });

      if (barang.error) {
        throw createHttpError.BadRequest(barang.error);
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
      const { id: userId } = res.locals;
      const barang = await service.findAll({ userId });
      if (barang.error) {
        throw createHttpError.BadRequest(barang.error);
      }
      const result: ResBody = {
        message: "success findAll",
        status: 200,
        data: barang.data,
      };
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
