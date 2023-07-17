import { Request } from "express";

import Joi from "joi";

export interface BarangAttributes {
  id: number;
  nama: string;
  hargaPokok: number;
  hargaJual: number;
  stok: number;
  status: boolean;
  userId?: number;
  kategoriId?: number;
}

export interface IError {
  error?: string;
}

export interface IResult extends IError {
  data?: BarangAttributes | BarangAttributes[] | null;
}

export interface ResBody extends IResult {
  message: string;
  status: number;
}

export interface ReqBody {
  nama: string;
  hargaPokok: number;
  hargaJual: number;
  stok: number;
  status: boolean;
  userId?: number;
  kategoriId?: number;
}

export interface IEdit {
  id: number;
  payload: ReqBody;
}

export type TWhere = {
  id?: number;
  nama?: string;
  hargaPokok?: number;
  hargaJual?: number;
  stok?: number;
  status?: boolean;
  userId: number;
  kategoriId?: number;
};

export interface IValidation {
  req: Request;
  schema: Joi.ObjectSchema<ReqBody>;
}

export interface IResValidation extends IError {
  value?: ReqBody;
}
