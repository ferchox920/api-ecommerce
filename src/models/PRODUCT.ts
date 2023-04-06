import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

interface ProductAttributes {
  id?: number;
  sku: string;
  barcode: string;
  name: string;
  image?: string | null;
  description?: string | null;
  color?: string | null;
  variety?: string | null;
  weight?: number | null;
  price: number;
  category?: string | null;
  subcategory?: string | null;
  location?: string | null;
  manufacturing_origin?: string | null;
  sale_market?: string | null;
  product_url?: string | null;
  supplier?: string | null;
  tag?: string | null;
  units_available?: number | null;
  bundle?: boolean;
  item_cost?: number | null;
  roi?: number | null;
}

interface ProductModel extends Model<ProductAttributes>, ProductAttributes {}

const PRODUCT = sequelize.define<ProductModel>("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  variety: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subcategory: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  manufacturing_origin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sale_market: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  product_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  supplier: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  units_available: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  bundle: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  item_cost: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  roi: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

export default PRODUCT;
