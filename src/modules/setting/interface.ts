import { Request } from "express";

import Joi from "joi";

export interface SettingAttributes {
  id: number;
  nama: string;
  fileUrl: string;
  logo?: Buffer;
  userId?: number;
}

export interface IError {
  error?: string;
}

export interface IResult extends IError {
  data?: SettingAttributes | null;
}

export interface ResBody extends IResult {
  message: string;
  status: number;
}

export interface ReqBody {
  nama: string;
  userId?: number;
  fileUrl?: string;
  logo?: Buffer;
}

export interface IEdit {
  payload: ReqBody;
  id: number;
}

export interface IValidation {
  req: Request;
  schema: Joi.ObjectSchema<ReqBody>;
}
export interface IResValidation extends IError {
  value?: ReqBody;
}

export type TWhere = {
  userId?: number;
  fileUrl?: string;
};
