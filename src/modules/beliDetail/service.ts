import { Transaction } from "sequelize";

import { IEdit, IError, ReqBody } from "./interface";
import BeliModel from "./model";

class Service {
  async create(payload: ReqBody[], transaction: Transaction): Promise<IError> {
    try {
      await BeliModel.bulkCreate(payload, { transaction });
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
      await BeliModel.update(payload, { where: { id } });
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
