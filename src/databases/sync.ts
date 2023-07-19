import BarangModel from "@modules/barang/model";
import BeliModel from "@modules/beli/model";
import BeliDetailModel from "@modules/beliDetail/model";
import KategoriModel from "@modules/kategori/model";
import SettingModel from "@modules/setting/model";
import SuplierModel from "@modules/suplier/model";
import UserModel from "@modules/user/model";

import sequelize from "./sequelize";

const syncDb = async () => {
  try {
    await sequelize.authenticate();
    await BeliDetailModel.sync({ alter: true });
    await BeliModel.sync();
    await SuplierModel.sync();
    await BarangModel.sync();
    await KategoriModel.sync();
    await SettingModel.sync();
    await UserModel.sync();

    console.log(`success sync mode ${process.env.ENV}`);
  } catch (error) {
    const e = error as Error;
    console.log(`------------------- ${e.message} -------------------`);
  }
};

syncDb();
