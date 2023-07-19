import BarangModel from "@modules/barang/model";

import { IEdit, IError, IResult, ReqBody } from "./interface";
import ReturModel from "./model";

class Service {
  async create(payload: ReqBody): Promise<IError> {
    try {
      await ReturModel.create(payload);
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
      await ReturModel.update(payload, { where: { id } });
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
      const res = await ReturModel.findAll({
        include: [
          {
            model: BarangModel,
            attributes: ["id", "nama"],
          },
        ],
      });
      return { data: res.map((item) => item.toJSON()) };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
}

export default new Service();
