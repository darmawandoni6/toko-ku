import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@databases/sequelize";
import JualDetailModel from "@modules/jualDetail/model";
import ReturModel from "@modules/retur/model";

import { BarangAttributes } from "./interface";

type CreationAttributes = Optional<BarangAttributes, "id" | "status" | "fileName">;
export interface Instance extends Model<BarangAttributes, CreationAttributes>, BarangAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const BarangModel = sequelize.define<Instance>(
  "barang",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    barcode: {
      allowNull: false,
      type: DataTypes.STRING(35),
    },
    fileName: {
      type: DataTypes.STRING,
    },
    nama: {
      allowNull: false,
      type: DataTypes.STRING(35),
    },
    hargaPokok: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    hargaJual: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    stok: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    kategoriId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  { freezeTableName: true },
);

BarangModel.hasOne(ReturModel);
ReturModel.belongsTo(BarangModel);

BarangModel.hasOne(JualDetailModel);
JualDetailModel.belongsTo(BarangModel);

export default BarangModel;
