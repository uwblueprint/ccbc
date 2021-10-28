import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("series", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataType.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataType.STRING,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("series");
};
