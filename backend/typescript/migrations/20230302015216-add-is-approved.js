"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const creatorsDef = await queryInterface.describeTable("creator");

    return queryInterface.sequelize.transaction(async (t) => {
      if (!creatorsDef.is_approved) {
        await queryInterface.addColumn(
          "creator",
          "is_approved",
          { type: Sequelize.BOOLEAN },
          { transaction: t },
        );
      }

      return Promise.resolve();
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
