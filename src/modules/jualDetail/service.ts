import { Transaction } from "sequelize";

import { IError, ReqBody } from "./interface";
import JualDetailModel from "./model";

class Service {
  async bulkCreate(payload: ReqBody[], transaction: Transaction): Promise<IError> {
    try {
      await JualDetailModel.bulkCreate(payload, { transaction });
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
