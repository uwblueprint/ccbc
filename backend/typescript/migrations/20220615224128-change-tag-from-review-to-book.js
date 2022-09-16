/* eslint-disable */
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable("review_tag", { transaction: t });
      await queryInterface.dropTable("tags", { transaction: t, cascade: true });
      await queryInterface.createTable(
        "tags",
        {
          name: {
            type: Sequelize.STRING,
            primaryKey: true,
          },
        },
        { transaction: t },
      );
      await queryInterface.createTable(
        "book_tag",
        {
          book_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
              model: "books",
              key: "id",
            },
          },
          tag_name: {
            type: Sequelize.STRING,
            primaryKey: true,
            references: {
              model: "tags",
              key: "name",
            },
          },
          createdAt: {
            type: Sequelize.DATE,
          },
          updatedAt: {
            type: Sequelize.DATE,
          },
        },
        { transaction: t },
      );
      await t.commit();
      return Promise.resolve();
    } catch (e) {
      await t.rollback();
      return Promise.reject(e);
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable("book_tag", { transaction: t });
      await queryInterface.dropTable("tags", { transaction: t });
      await queryInterface.createTable(
        "tags",
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
          },
          createdAt: {
            type: Sequelize.DATE,
          },
          updatedAt: {
            type: Sequelize.DATE,
          },
        },
        { transaction: t },
      );
      await queryInterface.createTable(
        "review_tag",
        {
          review_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
              model: "reviews",
              key: "id",
            },
          },
          tag_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
              model: "tags",
              key: "id",
            },
          },
        },
        { transaction: t },
      );
      await t.commit();
      return Promise.resolve();
    } catch (e) {
      await t.rollback();
      return Promise.reject(e);
    }
  },
};
