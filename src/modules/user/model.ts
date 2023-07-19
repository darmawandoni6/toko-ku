import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@databases/sequelize";
import BarangModel from "@modules/barang/model";
import BeliModel from "@modules/beli/model";
import SettingModel from "@modules/setting/model";

import { UserAttributes } from "./interface";

type CreationAttributes = Optional<UserAttributes, "id" | "foto" | "status">;
interface Instance extends Model<UserAttributes, CreationAttributes>, UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const UserModel = sequelize.define<Instance>(
  "user",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING(30),
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    level: {
      allowNull: false,
      type: DataTypes.STRING(30),
    },
    status: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    foto: {
      type: DataTypes.BLOB("long"),
    },
  },
  { freezeTableName: true },
);

UserModel.hasOne(SettingModel);
SettingModel.belongsTo(UserModel);

UserModel.hasMany(BarangModel);
BarangModel.belongsTo(UserModel);

UserModel.hasOne(BeliModel);
BeliModel.belongsTo(UserModel);

export default UserModel;
