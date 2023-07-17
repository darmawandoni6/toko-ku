import { NextFunction, Request, Response } from "express";

import { FileArray, UploadedFile } from "express-fileupload";
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
        nama: Joi.string().min(5).max(30).required(),
      });

      const { value, error } = validation({ req, schema });
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }

      const find = await service.findOne({ userId });
      if (find.error) {
        throw createHttpError.BadRequest(find.error);
      }
      if (find.data) {
        throw createHttpError.Conflict("toko has been created");
      }

      const { toko } = req.files as FileArray;
      const regex = /image\/*/;
      if (!toko) {
        throw createHttpError.BadRequest('"toko" is required');
      }
      const { truncated, mimetype, data, md5 } = toko as UploadedFile;
      if (truncated || !regex.test(mimetype)) {
        throw createHttpError.BadRequest("Size to large or file only image");
      }

      const upload = await service.create({
        nama: value.nama,
        logo: data,
        userId,
        fileUrl: md5 + mimetype.replace(regex, "."),
      });

      if (upload.error) {
        throw createHttpError.BadRequest(upload.error);
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
        nama: Joi.string().min(5).max(30),
      });

      const { value, error } = validation({ req, schema });
      if (error || !value) {
        throw createHttpError.BadRequest(error);
      }

      const payload: ReqBody = {
        nama: value.nama,
      };

      if (req.files?.toko) {
        const { toko } = req.files as FileArray;
        const regex = /image\/*/;
        const { truncated, mimetype, data, md5 } = toko as UploadedFile;
        if (truncated || !regex.test(mimetype)) {
          throw createHttpError.BadRequest("Size to large or file only image");
        }
        payload.logo = data;
        payload.fileUrl = md5 + mimetype.replace(regex, ".");
      }

      const upload = await service.update({
        id: parseInt(req.params.id, 10),
        payload,
      });

      if (upload.error) {
        throw createHttpError.BadRequest(upload.error);
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
  async openFile(req: Request, res: Response, next: NextFunction) {
    try {
      const { fileUrl } = req.params;
      const { id: userId } = res.locals;

      const find = await service.findOne({ fileUrl, userId });

      const { data } = find;
      res.end(data?.logo);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
