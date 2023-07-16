import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import Joi from "joi";

import bcrypt from "@utils/bcrypt";
import jwt from "@utils/jwt";

import { Level, ReqBody, ResBody, TWhere, UserAttributes } from "./interface";
import service from "./service";
import { validation } from "./validation";

class Controller {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object<ReqBody>({
        username: Joi.string().min(5).max(30).required(),
        password: Joi.string().min(8).required(),
        level: Joi.string().valid(Level.Admin, Level.Karyawan),
        status: Joi.boolean(),
      });
      const { value, error } = validation({ req, schema });
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }
      const where: TWhere = {
        username: value.username,
      };

      const user = await service.findOne({ username: where.username });
      if (user.data) {
        throw createHttpError.Conflict("username already used");
      }
      if (user.error) {
        throw createHttpError.BadRequest(user.error);
      }

      const payload: ReqBody = {
        username: value.username,
        password: bcrypt.encrypt(value.password),
        level: value.level,
      };
      if (value.status) {
        payload.status = value.status;
      }

      await service.create(payload);

      const result: ResBody = {
        message: "success register",
        status: 200,
      };
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object<ReqBody>({
        username: Joi.string().required(),
        password: Joi.string().required(),
      });
      const { value, error } = validation({ req, schema });
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }
      const where: TWhere = {
        username: value.username,
      };
      const user = await service.findOne({ username: where.username });
      if (user.error) {
        throw createHttpError.BadRequest(user.error);
      }

      const data: UserAttributes = user.data as UserAttributes;
      const match = bcrypt.compare(value.password, data.password);
      if (!match) {
        throw createHttpError.NotFound("user not found");
      }

      data.password = "";
      const token = jwt.signToken(data);

      const expired = new Date();
      expired.setDate(expired.getDate() + parseInt(process.env.EXP_TOKEN as string, 10));
      res.cookie("token", token, { httpOnly: true, expires: expired });

      const result: ResBody = {
        message: "success login",
        status: 200,
        data: null,
      };

      res.send(result);
    } catch (error) {
      res.clearCookie("token");
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
