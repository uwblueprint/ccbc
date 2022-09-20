module.exports = {
  async up(queryInterface, Sequelize) {
    const removeTagNameTransaction = queryInterface.sequelize.transaction(async (t) => {
      try {
        await queryInterface.removeConstraint(
          "book_tag",
          "book_tag_tag_name_fkey",
          { transaction: t },
        );
      } catch (e) {
        console.warn(e);
      }
    })
    
    const everythingElseTransaction = queryInterface.sequelize.transaction(async (t) => {
      // Remove previous constraints
      await queryInterface.removeConstraint(
        "book_tag",
        "book_tag_book_id_fkey",
        { transaction: t },
      );
      await queryInterface.removeConstraint(
        "book_genre",
        "book_genre_book_id_fkey",
        { transaction: t },
      );
      await queryInterface.removeConstraint(
        "book_genre",
        "book_genre_genre_name_fkey",
        { transaction: t },
      );
      // Add new constraints with cascade
      await queryInterface.addConstraint("book_tag", {
        fields: ["book_id"],
        type: "foreign key",
        name: "book_tag_book_id_fkey",
        references: {
          table: "books",
          field: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        transaction: t,
      });
      await queryInterface.addConstraint("book_tag", {
        fields: ["tag_name"],
        type: "foreign key",
        name: "book_tag_tag_name_fkey",
        references: {
          table: "tags",
          field: "name",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        transaction: t,
      });
      await queryInterface.addConstraint("book_genre", {
        fields: ["book_id"],
        type: "foreign key",
        name: "book_genre_book_id_fkey",
        references: {
          table: "books",
          field: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        transaction: t,
      });
      await queryInterface.addConstraint("book_genre", {
        fields: ["genre_name"],
        type: "foreign key",
        name: "book_genre_genre_name_fkey",
        references: {
          table: "genres",
          field: "name",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        transaction: t,
      });
    });

    return Promise.all([
      removeTagNameTransaction,
      everythingElseTransaction
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      // Remove previous constraints
      await queryInterface.removeConstraint(
        "book_tag",
        "book_tag_book_id_fkey",
        { transaction: t },
      );
      await queryInterface.removeConstraint(
        "book_tag",
        "book_tag_tag_name_fkey",
        { transaction: t },
      );
      await queryInterface.removeConstraint(
        "book_genre",
        "book_genre_book_id_fkey",
        { transaction: t },
      );
      await queryInterface.removeConstraint(
        "book_genre",
        "book_genre_genre_name_fkey",
        { transaction: t },
      );

      // Add back old constraints without cascade
      await queryInterface.addConstraint("book_tag", {
        fields: ["book_id"],
        type: "foreign key",
        name: "book_tag_book_id_fkey",
        references: {
          table: "books",
          field: "id",
        },
        transaction: t,
      });
      await queryInterface.addConstraint("book_tag", {
        fields: ["tag_name"],
        type: "foreign key",
        name: "book_tag_tag_name_fkey",
        references: {
          table: "tags",
          field: "name",
        },
        transaction: t,
      });
      await queryInterface.addConstraint("book_genre", {
        fields: ["book_id"],
        type: "foreign key",
        name: "book_genre_book_id_fkey",
        references: {
          table: "books",
          field: "id",
        },
        transaction: t,
      });
      await queryInterface.addConstraint("book_genre", {
        fields: ["genre_name"],
        type: "foreign key",
        name: "book_genre_genre_name_fkey",
        references: {
          table: "genres",
          field: "name",
        },
        transaction: t,
      });
    });
  },
};
