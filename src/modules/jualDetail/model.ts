import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@databases/sequelize";

import { JualDetailAttributes } from "./interface";

type CreationAttributes = Optional<JualDetailAttributes, "id">;
export interface Instance extends Model<JualDetailAttributes, CreationAttributes>, JualDetailAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const JualDetailModel = sequelize.define<Instance>(
  "jual_detail",
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
    hargaPokok: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    hargaJual: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
  },
  { freezeTableName: true },
);

export default JualDetailModel;
