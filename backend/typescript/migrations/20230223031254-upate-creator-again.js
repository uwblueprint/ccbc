module.exports = {
  async up(queryInterface, Sequelize) {
    const creatorsDef = await queryInterface.describeTable("creator");

    return queryInterface.sequelize.transaction(async (t) => {
      if (creatorsDef.age_group) {
        await queryInterface.addColumn(
          "creator",
          "age_range",
          { type: Sequelize.STRING },
          { transaction: t },
        );

        await queryInterface.removeColumn(
          "creator",
          "age_group",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      return Promise.resolve();
    });
  },

  async down(queryInterface, Sequelize) {
    
  },
};
