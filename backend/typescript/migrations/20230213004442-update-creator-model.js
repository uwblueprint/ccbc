module.exports = {
  async up(queryInterface, Sequelize) {
    const creatorsDef = await queryInterface.describeTable("creators");

    return queryInterface.sequelize.transaction(async (t) => {
      if (!creatorsDef.first_name) {
        await queryInterface.addColumn(
          "creators",
          "first_name",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.last_name) {
        await queryInterface.addColumn(
          "creators",
          "last_name",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.email) {
        await queryInterface.addColumn(
          "creators",
          "email",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.phone) {
        await queryInterface.addColumn(
          "creators",
          "phone",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.street_address) {
        await queryInterface.addColumn(
          "creators",
          "street_address",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.city) {
        await queryInterface.addColumn(
          "creators",
          "city",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.province) {
        await queryInterface.addColumn(
          "creators",
          "province",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.postal_code) {
        await queryInterface.addColumn(
          "creators",
          "postal_code",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.craft) {
        await queryInterface.addColumn(
          "creators",
          "craft",
          { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING) },
          { transaction: t },
        );
      }

      if (!creatorsDef.website) {
        await queryInterface.addColumn(
          "creators",
          "website",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.profile_picture_link) {
        await queryInterface.addColumn(
          "creators",
          "profile_picture_link",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.availability) {
        await queryInterface.addColumn(
          "creators",
          "availability",
          { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING) },
          { transaction: t },
        );
      }

      if (!creatorsDef.book_covers) {
        await queryInterface.addColumn(
          "creators",
          "book_covers",
          { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING) },
          { transaction: t },
        );
      }

      if (!creatorsDef.isReadyForReview) {
        await queryInterface.addColumn(
          "creators",
          "isReadyForReview",
          { type: Sequelize.BOOLEAN },
          { transaction: t },
        );
      }

      if (!creatorsDef.presentations) {
        await queryInterface.addColumn(
          "creators",
          "presentations",
          { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.JSON) },
          { transaction: t },
        );
      }

      if (!creatorsDef.publications) {
        await queryInterface.addColumn(
          "creators",
          "publications",
          { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.JSON) },
          { transaction: t },
        );
      }
      

      return Promise.resolve();
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn(
        "creators",
        "first_name",
        { type: Sequelize.STRING },
        { transaction: t },
      );

      await queryInterface.addColumn(
              "creators",
              "last_name",
              { type: Sequelize.STRING },
              { transaction: t },
            );

      await queryInterface.addColumn(
              "creators",
              "email",
              { type: Sequelize.STRING },
              { transaction: t },
            );

      await queryInterface.addColumn(
              "creators",
              "phone",
              { type: Sequelize.STRING },
              { transaction: t },
            );

      await queryInterface.addColumn(
              "creators",
              "street_address",
              { type: Sequelize.STRING },
              { transaction: t },
            );

      await queryInterface.addColumn(
              "creators",
              "city",
              { type: Sequelize.STRING },
              { transaction: t },
            );

      await queryInterface.addColumn(
              "creators",
              "province",
              { type: Sequelize.STRING },
              { transaction: t },
            );

      await queryInterface.addColumn(
              "creators",
              "postal_code",
              { type: Sequelize.STRING },
              { transaction: t },
            );

      await queryInterface.addColumn(
              "creators",
              "craft",
              { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING) },
              { transaction: t },
            );

      await queryInterface.addColumn(
              "creators",
              "website",
              { type: Sequelize.STRING },
              { transaction: t },
            );

      await queryInterface.addColumn(
              "creators",
              "profile_picture_link",
              { type: Sequelize.STRING },
              { transaction: t },
            );

      await queryInterface.addColumn(
              "creators",
              "availability",
              { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING) },
              { transaction: t },
            );

      await queryInterface.addColumn(
              "creators",
              "book_covers",
              { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING) },
              { transaction: t },
            );

      await queryInterface.addColumn(
              "creators",
              "isReadyForReview",
              { type: Sequelize.BOOLEAN },
              { transaction: t },
            );

      await queryInterface.addColumn(
              "creators",
              "presentations",
              { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.JSON) },
              { transaction: t },
            );

      await queryInterface.addColumn(
              "creators",
              "publications",
              { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.JSON) },
              { transaction: t },
            );


      return Promise.resolve();
    });
  },
};
