import KategoriModel from "@modules/kategori/model";

import { IEdit, IError, IResult, ReqBody, TWhere } from "./interface";
import BarangModel from "./model";

class Service {
  async create(payload: ReqBody): Promise<IError> {
    try {
      await BarangModel.create(payload);
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
      await BarangModel.update(payload, { where: { id } });
      return { error: undefined };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
  async findOne(where: TWhere): Promise<IResult> {
    try {
      const res = await BarangModel.findOne({ where });

      return { data: res ? res.toJSON() : null };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
  async findAll(where: TWhere): Promise<IResult> {
    try {
      const res = await BarangModel.findAll({
        where,
        include: [
          {
            model: KategoriModel,
            attributes: { exclude: ["createdAt", "updatedAt"] },
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
