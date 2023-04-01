import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  avatar?: string | null;
}


interface UserModel extends Model<UserAttributes>, UserAttributes {}

const USER = sequelize.define<UserModel>("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default USER;
