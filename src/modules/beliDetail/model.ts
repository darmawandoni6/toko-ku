import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@databases/sequelize";
import BarangModel from "@modules/barang/model";

import { BeliDetailAttributes, Status } from "./interface";

type CreationAttributes = Optional<BeliDetailAttributes, "id" | "status" | "alasan">;
export interface Instance extends Model<BeliDetailAttributes, CreationAttributes>, BeliDetailAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const BeliDetailModel = sequelize.define<Instance>(
  "beli_detail",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    harga: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    jumlah: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    total: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    status: {
      type: DataTypes.STRING(10),
      defaultValue: Status.proses,
    },
    alasan: {
      type: DataTypes.TEXT,
    },
  },
  { freezeTableName: true },
);

BarangModel.hasOne(BeliDetailModel);
BeliDetailModel.belongsTo(BarangModel);

export default BeliDetailModel;
