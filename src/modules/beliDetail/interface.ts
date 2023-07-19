export enum Status {
  proses = "proses",
  cancel = "cancel",
  done = "done",
}

export interface BeliDetailAttributes {
  id: number;
  harga: number;
  jumlah: number;
  total: number;
  status: Status;
  alasan: string;
  beliId?: number;
  barangId?: number;
}

export interface IError {
  error?: string;
}

export interface IResult extends IError {
  data?: BeliDetailAttributes | null;
}

export interface ResBody extends IResult {
  message: string;
  status: number;
}
export interface ReqBody {
  harga: number;
  jumlah: number;
  total: number;
  status: Status;
  beliId: number;
  barangId: number;
  alasan: string;
}

export interface IEdit {
  id: number;
  payload: ReqBody;
}

export interface IResValidation extends IError {
  value?: ReqBody;
}
