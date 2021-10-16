import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

export const up: Migration = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataType.INTEGER
      },
      review_id: {
        allowNull: false,
        type: DataType.INTEGER
      },
      title: {
        allowNull: false,
        type: DataType.STRING
      },
      series_id: {
        allowNull: true,
        type: DataType.INTEGER,
        references: {
            table: 'series',
            field: 'id'
        } 
      },
      series_order: {
        allowNull: true,
        type: DataType.STRING
      },
      illustrator: {
        allowNull: true,
        type: DataType.ARRAY(DataType.STRING)
      },
      translator: {
        allowNull: true,
        type: DataType.ARRAY(DataType.STRING)
      },
      formats: {
        allowNull: false,
        type: DataType.JSON
      },
      age_range: {
        allowNull: true,
        type: Sequelize.RANGE(Sequelize.INTEGER)
      },
    });
  };

export const down: Migration = async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('books');
};
