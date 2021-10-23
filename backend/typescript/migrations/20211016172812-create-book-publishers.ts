import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable('book_publishers', {
        publisher_id: {
            allowNull: false,
            type: DataType.INTEGER,
            references: {
                table: 'publishers',
                field: 'id'
            }
        },
        book_id: {
            allowNull: false,
            type: DataType.INTEGER,
            references: {
                table: 'books',
                field: 'id'
            }
        },
    });
  };

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('book_publishers');
};
