import SettingModel from "@modules/setting/model";

import { IEdit, IError, IResult, UserAttributes } from "./interface";
import UserModel from "./model";

class Service {
  async create(payload: UserAttributes): Promise<IError> {
    try {
      await UserModel.create(payload);
      return { error: undefined };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
  async findOne(where: Partial<UserAttributes>): Promise<IResult> {
    try {
      const res = await UserModel.findOne({ where });
      return {
        data: res ? res.toJSON() : null,
      };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
  async findOneProfile(where: Partial<UserAttributes>): Promise<IResult> {
    try {
      const res = await UserModel.findOne({
        where,
        attributes: { exclude: ["password"] },
        include: [{ model: SettingModel, attributes: { exclude: ["logo"] } }],
      });

      return {
        data: res ? res.toJSON() : null,
      };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
  async edit({ id, payload }: IEdit): Promise<IError> {
    try {
      await UserModel.update(payload, {
        where: {
          id,
        },
      });
      return {
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
