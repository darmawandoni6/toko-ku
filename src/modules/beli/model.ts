import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@databases/sequelize";
import BeliDetailModel from "@modules/beliDetail/model";

import { BeliAttributes } from "./interface";

type CreationAttributes = Optional<BeliAttributes, "id">;
export interface Instance extends Model<BeliAttributes, CreationAttributes>, BeliAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const BeliModel = sequelize.define<Instance>(
  "beli",
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
    tanggal: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  { freezeTableName: true },
);

BeliModel.hasMany(BeliDetailModel);
BeliDetailModel.belongsTo(BeliModel);

export default BeliModel;
