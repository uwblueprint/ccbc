import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { dbURL, SQLOptions } from "../utilities/dbUtils";

const sequelizeOptions: SequelizeOptions = SQLOptions("/*.model.ts", true);

const testSql = new Sequelize(dbURL, sequelizeOptions);

export default testSql;
