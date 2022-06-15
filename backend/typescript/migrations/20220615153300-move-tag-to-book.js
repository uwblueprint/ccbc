/* eslint-disable */
"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.dropTable("review_tag"),
      queryInterface.removeColumn("reviews", "tags"),
      queryInterface.addColumn("books", "tags", { type: DataTypes.STRING }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.createTable(
        "review_tag", 
        {

        }),
    ]);
  },
};
