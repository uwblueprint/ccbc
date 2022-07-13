module.exports = {
  async up(queryInterface, Sequelize) {
    const bookGenreDef = await queryInterface.describeTable("book_genre");
    const bookTagDef = await queryInterface.describeTable("book_tag");

    return queryInterface.sequelize.transaction(async (t) => {
      if (!bookGenreDef.createdAt)
        await queryInterface.addColumn(
          "book_genre",
          "createdAt",
          { type: Sequelize.DATE },
          { transaction: t },
        );
      if (!bookGenreDef.updatedAt)
        await queryInterface.addColumn(
          "book_genre",
          "updatedAt",
          { type: Sequelize.DATE },
          { transaction: t },
        );

      if (!bookTagDef.createdAt)
        await queryInterface.addColumn(
          "book_tag",
          "createdAt",
          { type: Sequelize.DATE },
          { transaction: t },
        );
      if (!bookTagDef.updatedAt)
        await queryInterface.addColumn(
          "book_tag",
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
        "book_genre",
        "createdAt",
        { type: Sequelize.DATE },
        { transaction: t },
      );
      await queryInterface.removeColumn(
        "book_genre",
        "updatedAt",
        { type: Sequelize.DATE },
        { transaction: t },
      );

      await queryInterface.removeColumn(
        "book_tag",
        "createdAt",
        { type: Sequelize.DATE },
        { transaction: t },
      );
      await queryInterface.removeColumn(
        "book_tag",
        "updatedAt",
        { type: Sequelize.DATE },
        { transaction: t },
      );

      return Promise.resolve();
    });
  },
};
