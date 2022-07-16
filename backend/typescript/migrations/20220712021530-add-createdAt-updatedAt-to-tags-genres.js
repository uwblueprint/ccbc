module.exports = {
  async up(queryInterface, Sequelize) {
    const genreDef = await queryInterface.describeTable("genres");
    const tagDef = await queryInterface.describeTable("tags");

    return queryInterface.sequelize.transaction(async (t) => {
      if (!genreDef.createdAt)
        await queryInterface.addColumn(
          "genres",
          "createdAt",
          { type: Sequelize.DATE },
          { transaction: t },
        );
      if (!genreDef.updatedAt)
        await queryInterface.addColumn(
          "genres",
          "updatedAt",
          { type: Sequelize.DATE },
          { transaction: t },
        );

      if (!tagDef.createdAt)
        await queryInterface.addColumn(
          "tags",
          "createdAt",
          { type: Sequelize.DATE },
          { transaction: t },
        );
      if (!tagDef.updatedAt)
        await queryInterface.addColumn(
          "tags",
          "updatedAt",
          { type: Sequelize.DATE },
          { transaction: t },
        );

      return Promise.resolve();
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn(
        "genres",
        "createdAt",
        { type: Sequelize.DATE },
        { transaction: t },
      );
      await queryInterface.removeColumn(
        "genres",
        "updatedAt",
        { type: Sequelize.DATE },
        { transaction: t },
      );

      await queryInterface.removeColumn(
        "tags",
        "createdAt",
        { type: Sequelize.DATE },
        { transaction: t },
      );
      await queryInterface.removeColumn(
        "tags",
        "updatedAt",
        { type: Sequelize.DATE },
        { transaction: t },
      );

      return Promise.resolve();
    });
  },
};
