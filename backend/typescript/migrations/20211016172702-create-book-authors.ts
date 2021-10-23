import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable('book_authors', {
        author_id: {
            allowNull: false,
            type: DataType.INTEGER,
            references: {
                model: 'authors',
                key: 'id'
            }
        },
        book_id: {
            allowNull: false,
            type: DataType.INTEGER,
            references: {
                model: 'books',
                key: 'id'
            }
        },
    });
  };

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('book_authors');
};
