import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@databases/sequelize";

import { UserAttributes } from "./interface";

type UserCreationAttributes = Optional<UserAttributes, "id" | "foto">;
interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const UserModel = sequelize.define<UserInstance>(
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
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    level: {
      allowNull: false,
      type: DataTypes.ENUM("admin", "karyawan"),
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

export default UserModel;
