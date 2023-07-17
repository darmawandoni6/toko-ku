import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@databases/sequelize";
import BeliModel from "@modules/beli/model";

import { SuplierAttributes } from "./interface";

type CreationAttributes = Optional<SuplierAttributes, "id" | "status">;
export interface Instance extends Model<SuplierAttributes, CreationAttributes>, SuplierAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const SuplierModel = sequelize.define<Instance>(
  "suplier",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nama: {
      allowNull: false,
      type: DataTypes.STRING(35),
    },
    alamat: {
      allowNull: false,
      type: DataTypes.STRING(60),
    },
    telpon: {
      allowNull: false,
      type: DataTypes.STRING(20),
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { freezeTableName: true },
);

SuplierModel.hasMany(BeliModel);
BeliModel.belongsTo(SuplierModel);

export default SuplierModel;
