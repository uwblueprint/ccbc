import { resolve } from "path";

import { Sequelize } from "sequelize-typescript";

const dbURL =
  process.env.DATABASE_URL ||
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.POSTGRES_DB}`;

const testSql = new Sequelize(dbURL, {
  models: [resolve(__dirname, "../models/*.model.ts")],
  logging: false,
});

export default testSql;
