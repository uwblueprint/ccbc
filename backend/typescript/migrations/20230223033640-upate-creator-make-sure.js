'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const creatorsDef = await queryInterface.describeTable("creator");

    return queryInterface.sequelize.transaction(async (t) => {
      if (!creatorsDef.age_range) {
        await queryInterface.addColumn(
          "creator",
          "age_range",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      return Promise.resolve();
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
