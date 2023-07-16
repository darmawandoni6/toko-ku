import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@databases/sequelize";

import { SettingAttributes } from "./interface";

type CreationAttributes = Optional<SettingAttributes, "id">;
interface Instance extends Model<SettingAttributes, CreationAttributes>, SettingAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const SettingModel = sequelize.define<Instance>(
  "setting",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nama: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    logo: {
      type: DataTypes.BLOB("long"),
    },
  },
  { freezeTableName: true },
);

export default SettingModel;
