import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@databases/sequelize";
import JualDetailModel from "@modules/jualDetail/model";

import { JualAttributes } from "./interface";

type CreationAttributes = Optional<JualAttributes, "id">;
export interface Instance extends Model<JualAttributes, CreationAttributes>, JualAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const JualModel = sequelize.define<Instance>(
  "jual",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    noFaktur: {
      allowNull: false,
      type: DataTypes.STRING(15),
    },
    bayar: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    kembalian: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
  },
  { freezeTableName: true },
);

JualModel.hasMany(JualDetailModel);
JualDetailModel.belongsTo(JualModel);

export default JualModel;
