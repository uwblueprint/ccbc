/* eslint-disable */
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable("review_tag");
      await queryInterface.dropTable("tags");
      await queryInterface.createTable(
        'tags',
        {
          name: {
            type: Sequelize.STRING,
            primaryKey: true,
          },
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },
        },
      );
      await queryInterface.createTable(
        'book_tag',
        {
          book_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
              model: 'books',
              key: 'id'
            },
          },
          tag_name: {
            type: Sequelize.STRING,
            primaryKey: true,
            references: {
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
      );
        return Promise.resolve();

      } catch (e) {
        return Promise.reject(e);
        
      }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable("book_tag");
      await queryInterface.dropTable("tags");
      await queryInterface.createTable(
        'tags',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
          },
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },
        },
      );
      await queryInterface.createTable(
        'review_tag',
        {
          review_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
              model: 'reviews',
              key: 'id'
            },
          },
          tag_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
              model: 'tags',
              key: 'id'
            },
          },
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },
        },
      );
      return Promise.resolve();
    } catch(e) {
      return Promise.reject(e);
    }
  },
};
