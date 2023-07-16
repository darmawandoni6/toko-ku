export interface SettingAttributes {
  id: number;
  nama: string;
  logo: string;
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
  logo: string;
}

export interface IEdit {
  payload: ReqBody;
  id: number;
}
