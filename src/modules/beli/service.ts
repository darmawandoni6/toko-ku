import { Transaction } from "sequelize";

import BarangModel from "@modules/barang/model";
import BeliDetailModel from "@modules/beliDetail/model";
import SuplierModel from "@modules/suplier/model";

import { IResult, ReqBody } from "./interface";
import BeliModel from "./model";

class Service {
  async create(payload: ReqBody, transaction: Transaction): Promise<IResult> {
    try {
      const res = await BeliModel.create(payload, { transaction });

      return {
        data: res.toJSON(),
      };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }

  async findAll(): Promise<IResult> {
    try {
      const res = await BeliModel.findAll({
        include: [
          {
            model: SuplierModel,
            attributes: { exclude: ["status", "createdAt", "updatedAt"] },
          },
          {
            model: BeliDetailModel,
            attributes: { exclude: ["beliId", "createdAt", "updatedAt"] },
            include: [
              {
                model: BarangModel,
                attributes: ["id", "nama"],
              },
            ],
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
