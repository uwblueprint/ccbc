import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { dbURL, SQLOptions } from "../utilities/dbUtils";

const sequelizeOptions: SequelizeOptions = SQLOptions("/*.model.ts", false);

const sequelize = new Sequelize(dbURL, sequelizeOptions);

export default sequelize;
