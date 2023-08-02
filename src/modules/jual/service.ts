import { Transaction } from "sequelize";

import JualDetailModel from "@modules/jualDetail/model";

import { IResult, ReqBody } from "./interface";
import JualModel from "./model";

class Service {
  async create(payload: ReqBody, transaction: Transaction): Promise<IResult> {
    try {
      const res = await JualModel.create(payload, { transaction });
      return { data: res.toJSON() };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }

  async findAll(): Promise<IResult> {
    try {
      const res = await JualModel.findAll({
        include: [
          {
            model: JualDetailModel,
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
