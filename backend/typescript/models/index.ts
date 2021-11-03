import * as path from "path";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const dbURL =
  process.env.DATABASE_URL ||
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.POSTGRES_DB}`;

const sequelizeOptions: SequelizeOptions = process.env.DATABASE_URL
  ? {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      models: [path.join(__dirname, "/*.model.ts")],
    }
  : {
      models: [path.join(__dirname, "/*.model.ts")],
    };

const sequelize = new Sequelize(dbURL, sequelizeOptions);

export default sequelize;
