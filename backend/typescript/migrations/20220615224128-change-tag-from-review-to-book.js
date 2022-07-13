/* eslint-disable */
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await sequelize.transaction();

    try {
<<<<<<< HEAD
      await queryInterface.dropTable("review_tag");
      await queryInterface.dropTable("tags");
      await queryInterface.createTable(
        'tags',
=======
      await queryInterface.dropTable("review_tag", { transaction: t });
      await queryInterface.dropTable("tags", { transaction: t });
      await queryInterface.createTable(
        "tags",
>>>>>>> development
        {
          name: {
            type: Sequelize.STRING,
            primaryKey: true,
          },
        },
<<<<<<< HEAD
      );
      await queryInterface.createTable(
        'book_tag',
=======
        { transaction: t },
      );
      await queryInterface.createTable(
        "book_tag",
>>>>>>> development
        {
          book_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
<<<<<<< HEAD
              model: 'books',
              key: 'id'
=======
              model: "books",
              key: "id",
>>>>>>> development
            },
          },
          tag_name: {
            type: Sequelize.STRING,
            primaryKey: true,
            references: {
<<<<<<< HEAD
              model: 'tags',
              key: 'name'
            },
          },
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },
        },
=======
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
>>>>>>> development
      );
      await t.commit();
      return Promise.resolve();
    } catch (e) {
      await t.rollback();
      return Promise.reject(e);
    }
  },

  async down(queryInterface, Sequelize) {
    const t = await sequelize.transaction();

    try {
<<<<<<< HEAD
      await queryInterface.dropTable("book_tag");
      await queryInterface.dropTable("tags");
      await queryInterface.createTable(
        'tags',
=======
      await queryInterface.dropTable("book_tag", { transaction: t });
      await queryInterface.dropTable("tags", { transaction: t });
      await queryInterface.createTable(
        "tags",
>>>>>>> development
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
          },
          createdAt: {
<<<<<<< HEAD
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },
        },
      );
      await queryInterface.createTable(
        'review_tag',
=======
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
>>>>>>> development
        {
          review_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
<<<<<<< HEAD
              model: 'reviews',
              key: 'id'
=======
              model: "reviews",
              key: "id",
>>>>>>> development
            },
          },
          tag_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
<<<<<<< HEAD
              model: 'tags',
              key: 'id'
            },
          },
        },
      );
      await t.commit();
      return Promise.resolve();
    } catch(e) {
=======
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
>>>>>>> development
      await t.rollback();
      return Promise.reject(e);
    }
  },
};
