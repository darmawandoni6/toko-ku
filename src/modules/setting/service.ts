import { IEdit, IError, IResult, ReqBody, TWhere } from "./interface";
import SettingModel from "./model";

class Service {
  async create(payload: ReqBody): Promise<IError> {
    try {
      await SettingModel.create(payload);
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
      await SettingModel.update(payload, { where: { id } });
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
      const res = await SettingModel.findOne({ where });

      return { data: res ? res.toJSON() : null };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
}

export default new Service();
