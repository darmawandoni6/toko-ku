import { Transaction } from "sequelize";
import { Literal } from "sequelize/types/utils";

import KategoriModel from "@modules/kategori/model";

import { BarangAttributes, IEdit, IError, IResult } from "./interface";
import BarangModel from "./model";

class Service {
  async create(payload: BarangAttributes): Promise<IError> {
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
  async updateStok(id: number, stok: Literal, transaction: Transaction): Promise<IError> {
    try {
      console.log(id, stok);

      await BarangModel.update({ stok }, { where: { id }, transaction });
      return { error: undefined };
    } catch (error) {
      const e = error as Error;
      console.log(e.message);

      return {
        error: e.message,
      };
    }
  }
  async findOne(where: Partial<BarangAttributes>): Promise<IResult> {
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
  async findAll(where: Partial<BarangAttributes>): Promise<IResult> {
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
