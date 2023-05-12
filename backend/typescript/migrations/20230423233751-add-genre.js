'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const creatorsDef = await queryInterface.describeTable("creator");

    return queryInterface.sequelize.transaction(async (t) => {
      if (creatorsDef.genre) {
        await queryInterface.removeColumn(
          "creator",
          "genre",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      await queryInterface.addColumn(
        "creator",
        "genre",
        { type:  Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING) },
        { transaction: t },
      );

      return Promise.resolve();
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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
