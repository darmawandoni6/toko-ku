import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import Joi from "joi";

import { ReqBody, ResBody, Status } from "./interface";
import service from "./service";
import { validation } from "./validation";

class Controller {
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object<ReqBody>({
        harga: Joi.number(),
        jumlah: Joi.number(),
        total: Joi.number(),
        status: Joi.string().valid(Status.cancel, Status.done).required(),
        beliId: Joi.number(),
        barangId: Joi.number(),
        alasan: Joi.alternatives().conditional("status", {
          is: Joi.string().valid(Status.cancel),
          then: Joi.string().required(),
        }),
      });

      const { value, error } = validation(req, schema);
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }

      const beliDetail = await service.update({ id: parseInt(req.params.id), payload: value });
      if (beliDetail.error) {
        throw createHttpError.BadRequest(beliDetail.error);
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
}

export default new Controller();
