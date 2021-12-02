import { resolve } from "path";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { testDbURL, SQLOptions } from "../utilities/dbUtils";

const sequelizeOptions: SequelizeOptions = SQLOptions(
  [resolve(__dirname, "../models/*.model.{ts,js}")],
  true,
);

export const testSql = new Sequelize(testDbURL, sequelizeOptions);

export default testSql;
