import { resolve } from "path";

import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const dbURL =
  process.env.DATABASE_URL ||
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.POSTGRES_DB}`;

const sequelizeOptions: SequelizeOptions = process.env.DATABASE_URL
  ? {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: true,
        rejectUnauthorized: false,
      },
      models: [resolve(__dirname, "../models/*.model.ts")],
      logging: false,
    }
  : {
      models: [resolve(__dirname, "../models/*.model.ts")],
      logging: false,
    };

const testSql = new Sequelize(dbURL, sequelizeOptions);

export default testSql;
