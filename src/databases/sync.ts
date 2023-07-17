import SettingModel from "@modules/setting/model";
import UserModel from "@modules/user/model";

import sequelize from "./sequelize";

const syncDb = async () => {
  try {
    await sequelize.authenticate();
    await SettingModel.sync({ alter: true });
    await UserModel.sync();

    console.log(`success sync mode ${process.env.ENV}`);
  } catch (error) {
    const e = error as Error;
    console.log(`------------------- ${e.message} -------------------`);
  }
};

syncDb();
