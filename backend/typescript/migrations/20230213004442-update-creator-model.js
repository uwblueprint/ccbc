module.exports = {
  async up(queryInterface, Sequelize) {
    const creatorsDef = await queryInterface.describeTable("creator");

    return queryInterface.sequelize.transaction(async (t) => {
      if (!creatorsDef.first_name) {
        await queryInterface.addColumn(
          "creator",
          "first_name",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.last_name) {
        await queryInterface.addColumn(
          "creator",
          "last_name",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.email) {
        await queryInterface.addColumn(
          "creator",
          "email",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.phone) {
        await queryInterface.addColumn(
          "creator",
          "phone",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.street_address) {
        await queryInterface.addColumn(
          "creator",
          "street_address",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.city) {
        await queryInterface.addColumn(
          "creator",
          "city",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.province) {
        await queryInterface.addColumn(
          "creator",
          "province",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.postal_code) {
        await queryInterface.addColumn(
          "creator",
          "postal_code",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.craft) {
        await queryInterface.addColumn(
          "creator",
          "craft",
          { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING) },
          { transaction: t },
        );
      }

      if (!creatorsDef.website) {
        await queryInterface.addColumn(
          "creator",
          "website",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.profile_picture_link) {
        await queryInterface.addColumn(
          "creator",
          "profile_picture_link",
          { type: Sequelize.STRING },
          { transaction: t },
        );
      }

      if (!creatorsDef.availability) {
        await queryInterface.addColumn(
          "creator",
          "availability",
          { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING) },
          { transaction: t },
        );
      }

      if (!creatorsDef.book_covers) {
        await queryInterface.addColumn(
          "creator",
          "book_covers",
          { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING) },
          { transaction: t },
        );
      }

      if (!creatorsDef.isReadyForReview) {
        await queryInterface.addColumn(
          "creator",
          "isReadyForReview",
          { type: Sequelize.BOOLEAN },
          { transaction: t },
        );
      }

      if (!creatorsDef.presentations) {
        await queryInterface.addColumn(
          "creator",
          "presentations",
          { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.JSON) },
          { transaction: t },
        );
      }

      if (!creatorsDef.publications) {
        await queryInterface.addColumn(
          "creator",
          "publications",
          { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.JSON) },
          { transaction: t },
        );
      }
      

      return Promise.resolve();
    });
  },

  async down(queryInterface, Sequelize) {
    const creatorsDef = await queryInterface.describeTable("creator");
    
    return queryInterface.sequelize.transaction(async (t) => {
      if (creatorsDef.first_name) {
        await queryInterface.removeColumn(
          "creator",
          "first_name",
          { type: Sequelize.STRING },
          { transaction: t },
        );
  
        await queryInterface.removeColumn(
                "creator",
                "last_name",
                { type: Sequelize.STRING },
                { transaction: t },
              );
  
        await queryInterface.removeColumn(
                "creator",
                "email",
                { type: Sequelize.STRING },
                { transaction: t },
              );
  
        await queryInterface.removeColumn(
                "creator",
                "phone",
                { type: Sequelize.STRING },
                { transaction: t },
              );
  
        await queryInterface.removeColumn(
                "creator",
                "street_address",
                { type: Sequelize.STRING },
                { transaction: t },
              );
  
        await queryInterface.removeColumn(
                "creator",
                "city",
                { type: Sequelize.STRING },
                { transaction: t },
              );
  
        await queryInterface.removeColumn(
                "creator",
                "province",
                { type: Sequelize.STRING },
                { transaction: t },
              );
  
        await queryInterface.removeColumn(
                "creator",
                "postal_code",
                { type: Sequelize.STRING },
                { transaction: t },
              );
  
        await queryInterface.removeColumn(
                "creator",
                "craft",
                { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING) },
                { transaction: t },
              );
  
        await queryInterface.removeColumn(
                "creator",
                "website",
                { type: Sequelize.STRING },
                { transaction: t },
              );
  
        await queryInterface.removeColumn(
                "creator",
                "profile_picture_link",
                { type: Sequelize.STRING },
                { transaction: t },
              );
  
        await queryInterface.removeColumn(
                "creator",
                "availability",
                { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING) },
                { transaction: t },
              );
  
        await queryInterface.removeColumn(
                "creator",
                "book_covers",
                { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING) },
                { transaction: t },
              );
  
        await queryInterface.removeColumn(
                "creator",
                "isReadyForReview",
                { type: Sequelize.BOOLEAN },
                { transaction: t },
              );
  
        await queryInterface.removeColumn(
                "creator",
                "presentations",
                { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.JSON) },
                { transaction: t },
              );
  
        await queryInterface.removeColumn(
                "creator",
                "publications",
                { type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.JSON) },
                { transaction: t },
              );
      }


      return Promise.resolve();
    });
  },
};
