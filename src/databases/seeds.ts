import bcrypt from "@utils/bcrypt";

import KategoriModel from "@modules/kategori/model";
import { Level } from "@modules/user/interface";
import UserModel from "@modules/user/model";

const seddDb = async () => {
  try {
    await KategoriModel.create({ nama: "other" });
    await UserModel.create({
      username: "doni1",
      password: bcrypt.encrypt("kiasu123"),
      level: Level.Admin,
    });
  } catch (error) {
    const e = error as Error;
    console.log(e.message);
  }
};

seddDb();
