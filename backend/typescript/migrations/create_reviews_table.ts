import { DataType } from "sequelize-typescript"

import { Migration } from "../umzug"

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("reviews", {
        id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        body: {
            type:DataType.STRING,
            allowNull: false,
        },
        cover_images: {
            type: DataType.STRING,
            allowNull: false,
        },
        byline: {
            type: DataType.STRING,
            allowNull: false,
        },
        featured: {
            type: DataType.STRING,
            allowNull: false,
        },
        published_at: {
            type: DataType.DATE,
            allowNull: true,
        },
        createdAt: {
            allowNull: false,
            type: DataType.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataType.DATE,
        },
    });
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable("reviews");
}
