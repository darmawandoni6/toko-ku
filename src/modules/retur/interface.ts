export interface returAttributes {
  id: number;
  qty: number;
  harga: number;
  keterangan: string;
}

export interface IError {
  error?: string;
}

export interface IResult extends IError {
  data?: returAttributes[] | null;
}

export interface ResBody extends IResult {
  message: string;
  status: number;
}
export interface ReqBody {
  qty: number;
  harga: number;
  keterangan: string;
  barangId: number;
}

export interface IEdit {
  id: number;
  payload: ReqBody;
}

export interface IResValidation extends IError {
  value?: ReqBody;
}
