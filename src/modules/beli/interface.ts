import { ReqBody as ReqBodyDetail } from "@modules/beliDetail/interface";

export interface BeliAttributes {
  id: number;
  noFaktur: string;
  tanggal: Date;
}

export interface IError {
  error?: string;
}

export interface IResult extends IError {
  data?: BeliAttributes | BeliAttributes[] | null;
}

export interface ResBody extends IResult {
  message: string;
  status: number;
}
export interface ReqBody {
  noFaktur: string;
  tanggal: Date;
  suplierId: number;
  userId: number;
}

export interface ReqBodyPO extends ReqBody {
  details: ReqBodyDetail[];
}

export interface IResValidation extends IError {
  value?: ReqBodyPO;
}
