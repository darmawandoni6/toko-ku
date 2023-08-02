import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import Joi from "joi";
import { Transaction } from "sequelize";

import sequelize from "@databases/sequelize";
import serviceBarang from "@modules/barang/service";
import { ReqBody as ReqBodyDetail } from "@modules/jualDetail/interface";
import serviceJualDetail from "@modules/jualDetail/service";

import { JualAttributes, ReqBody, ReqBodyJual, ResBody } from "./interface";
import JualModel from "./model";
import service from "./service";
import { validation } from "./validation";

class Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    const t: Transaction = await sequelize.transaction();
    try {
      const { id: userId } = res.locals;
      const schema = Joi.object<ReqBodyJual>({
        noFaktur: Joi.string(),
        bayar: Joi.number().min(1).required(),
        kembalian: Joi.number().min(1).required(),
        detail: Joi.array().items(
          Joi.object<ReqBodyDetail>({
            qty: Joi.number().min(1).required(),
            hargaPokok: Joi.number().min(1).required(),
            hargaJual: Joi.number().min(1).required(),
            barangId: Joi.number().min(1).required(),
          }),
        ),
      });

      const { value, error } = validation(req, schema);
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }

      const jualPayload: ReqBody = {
        noFaktur: value.noFaktur,
        bayar: value.bayar,
        kembalian: value.kembalian,
        userId,
      };

      if (!jualPayload.noFaktur) {
        const year = new Date().getFullYear();
        let month = new Date().getMonth().toString();
        let date = new Date().getDate().toString();
        if (date.length === 1) date = "0" + date;
        if (month.length === 1) month = "0" + month;

        let count = await JualModel.count();
        count += 1;

        let stringCode = "00000";
        const idx: string = count.toString();
        stringCode = stringCode.slice(0, stringCode.length - idx.length);
        stringCode = stringCode + idx;

        jualPayload.noFaktur = "JU" + year + month + date + stringCode;
      }

      const jual = await service.create(jualPayload, t);
      if (jual.error) {
        throw createHttpError.BadRequest(jual.error);
      }

      for (const detail of value.detail) {
        const stok = sequelize.literal(`stok - ${detail.qty}`);
        const update = await serviceBarang.updateStok(detail.barangId, stok, t);
        if (update.error) {
          throw createHttpError.BadRequest(update.error);
        }
      }

      const resJual = jual.data as JualAttributes;
      const payloadJualDetail = value.detail.map((item) => ({ ...item, jualId: resJual.id }));
      const jualDetail = await serviceJualDetail.bulkCreate(payloadJualDetail, t);
      if (jualDetail.error) {
        throw createHttpError.BadRequest(jualDetail.error);
      }

      t.commit();
      const result: ResBody = {
        message: "success create",
        status: 200,
        data: null,
      };

      res.send(result);
    } catch (error) {
      t.rollback();
      next(error);
    }
  }
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const jual = await service.findAll();
      if (jual.error) {
        throw createHttpError.BadRequest(jual.error);
      }
      const result: ResBody = {
        message: "success find All",
        status: 200,
        data: jual.data,
      };

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
