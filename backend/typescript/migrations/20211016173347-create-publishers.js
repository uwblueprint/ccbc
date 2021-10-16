import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

export const up: Migration = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('publishers', {
        id: {
            allowNull: false,
            type: DataType.INTEGER,
            primaryKey: true
        },
        full_name: {
            allowNull: false,
            type: DataType.STRING
        },
        publish_date: {
            allowNull: false,
            type: DataType.DATE
        }
    });
  };

export const down: Migration = async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('publishers');
};
