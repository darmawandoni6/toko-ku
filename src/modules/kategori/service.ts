import { IEdit, IError, IResult, ReqBody } from "./interface";
import KategoriModel from "./model";

class Service {
  async create(payload: ReqBody): Promise<IError> {
    try {
      await KategoriModel.create(payload);
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
      await KategoriModel.update(payload, { where: { id } });
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
      const res = await KategoriModel.findAll();
      return { data: res.map((item) => item.toJSON()) };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
  async remove(id: number): Promise<IError> {
    try {
      await KategoriModel.destroy({ where: { id } });
      return { error: undefined };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
}

export default new Service();
