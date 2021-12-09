import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("books", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataType.INTEGER,
    },
    review_id: {
      allowNull: false,
      type: DataType.INTEGER,
      references: {
        model: "reviews",
        key: "id",
      },
    },
    cover_images: {
      type: DataType.STRING,
      allowNull: false,
    },
    title: {
      allowNull: false,
      type: DataType.STRING,
    },
    series_id: {
      allowNull: true,
      type: DataType.INTEGER,
      references: {
        model: "series",
        key: "id",
      },
    },
    series_order: {
      allowNull: true,
      type: DataType.STRING,
    },
    illustrator: {
      allowNull: true,
      type: DataType.ARRAY(DataType.STRING),
    },
    translator: {
      allowNull: true,
      type: DataType.ARRAY(DataType.STRING),
    },
    formats: {
      allowNull: false,
      type: DataType.ARRAY(DataType.JSON),
    },
    age_range: {
      allowNull: true,
      type: DataType.RANGE(DataType.INTEGER),
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("books");
};
