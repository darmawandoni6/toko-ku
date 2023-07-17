export interface SuplierAttributes {
  id: number;
  nama: string;
  alamat: string;
  telpon: string;
  status: boolean;
}

export interface IError {
  error?: string;
}

export interface IResult extends IError {
  data?: SuplierAttributes | SuplierAttributes[] | null;
}

export interface ResBody extends IResult {
  message: string;
  status: number;
}
export interface ReqBody {
  nama: string;
  alamat: string;
  telpon: string;
  status: boolean;
}

export interface IEdit {
  id: number;
  payload: ReqBody;
}

export interface IResValidation extends IError {
  value?: ReqBody;
}
