import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("users", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    auth_id: {
      type: DataType.STRING,
      allowNull: false,
    },
    role_type: {
      type: DataType.ENUM("Admin", "Subscriber", "Author"),
      allowNull: false,
    },
    first_name: {
      type: DataType.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataType.STRING,
      allowNull: false,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
    },
    active: {
      type: DataType.BOOLEAN,
      allowNull: false,
    },
    createdAt: DataType.DATE,
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("users");
};
