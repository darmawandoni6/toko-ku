export interface JualDetailAttributes {
  id: number;
  qty: number;
  hargaPokok: number;
  hargaJual: number;
}

export interface IError {
  error?: string;
}

export interface IResult extends IError {
  data?: JualDetailAttributes | JualDetailAttributes[] | null;
}

export interface ResBody extends IResult {
  message: string;
  status: number;
}
export interface ReqBody {
  qty: number;
  hargaPokok: number;
  hargaJual: number;
  barangId: number;
  jualId: number;
}

export interface IEdit {
  id: number;
  payload: ReqBody;
}

export interface IResValidation extends IError {
  value?: ReqBody;
}
