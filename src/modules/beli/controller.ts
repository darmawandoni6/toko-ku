import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import Joi from "joi";
import { Transaction } from "sequelize";

import sequelize from "@databases/sequelize";
import { Status } from "@modules/beliDetail/interface";
import serviceBeliDetail from "@modules/beliDetail/service";

import { BeliAttributes, ReqBody, ReqBodyPO, ResBody } from "./interface";
import BeliModel from "./model";
import service from "./service";
import { validation } from "./validation";

class Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    const transaction: Transaction = await sequelize.transaction();
    try {
      const { id: userId } = res.locals;
      const schema = Joi.object<ReqBodyPO>({
        suplierId: Joi.number().required(),
        noFaktur: Joi.string(),
        tanggal: Joi.date().iso(),
        details: Joi.array()
          .items(
            Joi.object({
              barangId: Joi.number().required(),
              harga: Joi.number().required(),
              jumlah: Joi.number().required(),
              total: Joi.number().required(),
              status: Joi.string(),
            }),
          )
          .required(),
      });
      const { value, error } = validation(req, schema);
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }

      if (!value.noFaktur) {
        const year = new Date().getFullYear();
        let month = new Date().getMonth().toString();
        let date = new Date().getDate().toString();
        if (date.length === 1) date = "0" + date;
        if (month.length === 1) month = "0" + month;

        let count = await BeliModel.count();
        count += 1;

        let stringCode = "00000";
        const idx: string = count.toString();
        stringCode = stringCode.slice(0, stringCode.length - idx.length);
        stringCode = stringCode + idx;

        value.noFaktur = "PO" + year + month + date + stringCode;
      }

      const beliPayload: ReqBody = {
        noFaktur: value.noFaktur,
        tanggal: value.tanggal || new Date(),
        suplierId: value.suplierId,
        userId,
      };
      const beli = await service.create(beliPayload, transaction);
      if (beli.error) {
        throw createHttpError.BadRequest(beli.error);
      }

      const resBeli = beli.data as BeliAttributes;
      const detailPayload = value.details.map((item) => ({ ...item, status: Status.proses, beliId: resBeli.id }));
      const detail = await serviceBeliDetail.create(detailPayload, transaction);
      if (detail.error) {
        throw createHttpError.BadRequest(detail.error);
      }

      transaction.commit();

      const result: ResBody = {
        message: "success create",
        status: 200,
        data: null,
      };

      res.send(result);
    } catch (error) {
      transaction.rollback();
      next(error);
    }
  }
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const beli = await service.findAll();
      if (beli.error) {
        throw createHttpError.BadRequest(beli.error);
      }
      const result: ResBody = {
        message: "success update",
        status: 200,
        data: beli.data,
      };

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
