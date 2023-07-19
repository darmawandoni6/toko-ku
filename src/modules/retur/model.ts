import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@databases/sequelize";

import { returAttributes } from "./interface";

type CreationAttributes = Optional<returAttributes, "id">;
export interface Instance extends Model<returAttributes, CreationAttributes>, returAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const ReturModel = sequelize.define<Instance>(
  "retur",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    qty: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    harga: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    keterangan: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  },
  { freezeTableName: true },
);

export default ReturModel;
