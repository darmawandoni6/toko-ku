import { Request } from "express";

import Joi from "joi";

export enum Level {
  Admin = "admin",
  Karyawan = "karyawan",
}
export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  level: Level;
  status: boolean;
  foto?: string;
}

export interface IError {
  error?: string;
}

export interface IResult extends IError {
  data?: UserAttributes | null;
}

export interface ResBody extends IResult {
  message: string;
  status: number;
}

export interface ReqBody {
  username: string;
  password: string;
  level: Level;
  status?: boolean;
  foto?: string;
}

export type TWhere = {
  id?: number;
  username?: string;
};

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
