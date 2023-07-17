import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@databases/sequelize";
import BarangModel from "@modules/barang/model";

import { KategoriAttributes } from "./interface";

type CreationAttributes = Optional<KategoriAttributes, "id">;
export interface Instance extends Model<KategoriAttributes, CreationAttributes>, KategoriAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const KategoriModel = sequelize.define<Instance>(
  "kategori",
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
  },
  { freezeTableName: true },
);

KategoriModel.hasOne(BarangModel);
BarangModel.belongsTo(KategoriModel);

export default KategoriModel;
