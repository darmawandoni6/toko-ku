export interface KategoriAttributes {
  id: number;
  nama: string;
}

export interface IError {
  error?: string;
}

export interface IResult extends IError {
  data?: KategoriAttributes | KategoriAttributes[] | null;
}

export interface ResBody extends IResult {
  message: string;
  status: number;
}
export interface ReqBody {
  nama: string;
}

export interface IEdit {
  id: number;
  payload: ReqBody;
}

export interface IResValidation extends IError {
  value?: ReqBody;
}
