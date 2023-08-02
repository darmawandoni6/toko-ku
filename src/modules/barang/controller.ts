import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import Joi from "joi";

import { BarangAttributes, ResBody } from "./interface";
import service from "./service";
import { validation } from "./validation";

class Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object<BarangAttributes>({
        nama: Joi.string().required(),
        barcode: Joi.string().required(),
        fileName: Joi.string(),
        hargaPokok: Joi.number().min(1).required(),
        hargaJual: Joi.number().min(1).required(),
        stok: Joi.number().required(),
        status: Joi.boolean(),
        kategoriId: Joi.number().required(),
      });

      const { value, error } = validation({ req, schema });
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }

      let barang = await service.findOne({ barcode: value.barcode });
      if (barang.data) {
        throw createHttpError.Conflict("duplicate data");
      }
      if (barang.error) {
        throw createHttpError.BadRequest(barang.error);
      }

      barang = await service.create(value);
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
      const schema = Joi.object<BarangAttributes>({
        nama: Joi.string(),
        barcode: Joi.string(),
        fileName: Joi.string(),
        hargaPokok: Joi.number().min(1),
        hargaJual: Joi.number().min(1),
        stok: Joi.number(),
        status: Joi.boolean(),
        kategoriId: Joi.number(),
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
      let barang = await service.findOne({ id: parseInt(req.params.id, 10) });
      if (barang.error) {
        throw createHttpError.BadRequest(barang.error);
      }
      if (!barang.data) {
        throw createHttpError.NotFound();
      }

      barang = await service.update({
        id: parseInt(req.params.id, 10),
        payload: {
          status: false,
        },
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
      const barang = await service.findAll({ status: true });
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
