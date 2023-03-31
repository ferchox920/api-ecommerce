import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

enum Dialect {
  mysql = "mysql",
  postgres = "postgres",
  sqlite = "sqlite",
  mssql = "mssql",
}

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USERNAME!,
  process.env.PASSWORD_PG!,
  {
    host: process.env.DB_HOST!,
    dialect: process.env.DB_DIALECT as Dialect || Dialect.postgres,
    port: Number(process.env.DB_PORT) || 5432,
    logging: false,
  }
);

export default sequelize;
