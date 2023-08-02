import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import Joi from "joi";

import bcrypt from "@utils/bcrypt";
import jwt from "@utils/jwt";

import { Level, ResBody, UserAttributes } from "./interface";
import service from "./service";
import { validation } from "./validation";

class Controller {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object<UserAttributes>({
        username: Joi.string().min(5).max(30).required(),
        password: Joi.string().min(8).required(),
        level: Joi.string().valid(Level.Admin, Level.Karyawan).required(),
        status: Joi.boolean(),
        foto: Joi.string(),
      });
      const { value, error } = validation({ req, schema });
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }

      const user = await service.findOne({ username: value.username });
      if (user.data) {
        throw createHttpError.Conflict("username already used");
      }
      if (user.error) {
        throw createHttpError.BadRequest(user.error);
      }

      value.password = bcrypt.encrypt(value.password);

      await service.create(value);

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
      const schema = Joi.object<UserAttributes>({
        username: Joi.string().required(),
        password: Joi.string().required(),
      });
      const { value, error } = validation({ req, schema });
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }

      const user = await service.findOne({ username: value.username });
      if (user.error) {
        throw createHttpError.BadRequest(user.error);
      }
      if (!user.data) {
        throw createHttpError.NotFound("user/password not found");
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
      const schema = Joi.object<UserAttributes>({
        username: Joi.string().min(5).max(30),
        password: Joi.string().min(8),
        level: Joi.string().valid(Level.Admin, Level.Karyawan),
        status: Joi.boolean(),
        foto: Joi.string(),
      });
      const { value, error } = validation({ req, schema });
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }

      if (value.password) {
        value.password = bcrypt.encrypt(value.password);
      }

      const user = await service.edit({ id: parseInt(req.params.id, 10), payload: value });
      if (user.error) {
        throw createHttpError.BadRequest(user.error);
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
  async profile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = res.locals;

      const user = await service.findOneProfile({ id });
      if (user.error) {
        throw createHttpError.BadRequest(user.error);
      }
      const result: ResBody = {
        message: "success get profile",
        status: 200,
        data: user.data,
      };

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
