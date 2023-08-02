import { ReqBody as ReqBodyDetail } from "@modules/jualDetail/interface";

export interface JualAttributes {
  id: number;
  noFaktur: string;
  bayar: number;
  kembalian: number;
}

export interface IError {
  error?: string;
}

export interface IResult extends IError {
  data?: JualAttributes | JualAttributes[] | null;
}

export interface ResBody extends IResult {
  message: string;
  status: number;
}
export interface ReqBody {
  noFaktur: string;
  bayar: number;
  kembalian: number;
  userId: number;
}

export interface ReqBodyJual extends ReqBody {
  detail: ReqBodyDetail[];
}

export interface IResValidation extends IError {
  value?: ReqBodyJual;
}
