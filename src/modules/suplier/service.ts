import { IEdit, IError, IResult, ReqBody } from "./interface";
import SuplierModel from "./model";

class Service {
  async create(payload: ReqBody): Promise<IError> {
    try {
      await SuplierModel.create(payload);
      return { error: undefined };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
  async update({ id, payload }: IEdit): Promise<IError> {
    try {
      await SuplierModel.update(payload, { where: { id } });
      return { error: undefined };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
  async findAll(): Promise<IResult> {
    try {
      const res = await SuplierModel.findAll();
      return {
        data: res.map((item) => item.toJSON()),
        error: undefined,
      };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
}

export default new Service();
