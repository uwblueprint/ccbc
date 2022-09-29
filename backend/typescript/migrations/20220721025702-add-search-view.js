module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.sequelize.query(
        "drop materialized view if exists review_search;",
        { transaction: t },
      );
      await queryInterface.sequelize.query(
        `CREATE MATERIALIZED VIEW review_search AS
          WITH genre_agg AS (
            SELECT book_id, STRING_AGG(genre_name, ' ') AS genres
            FROM book_genre 
            GROUP BY book_id 
          ), tag_agg AS (
            SELECT book_id, STRING_AGG(tag_name, ' ') AS tags
            FROM book_tag
            GROUP BY book_id
          )
          SELECT
            r.id AS review_id,
            TO_TSVECTOR(
              'english', 
              COALESCE(r.body, ' ') || ' '
              || COALESCE(STRING_AGG(book_agg.title, ' '), '') || ' '
              || COALESCE(STRING_AGG(book_agg.authors, ' '), '') || ' '
              || COALESCE(STRING_AGG(book_agg.genres, ' '), '') || ' '
              || COALESCE(STRING_AGG(book_agg.tags, ' '), '') || ' '
            ) AS doc
          FROM reviews r
          INNER JOIN (
            SELECT 
              b.id, 
              b.review_id,
              b.title, 
              STRING_AGG(a.display_name, ' ') AS authors, 
              STRING_AGG(genre_agg.genres, ' ') AS genres,
              STRING_AGG(tag_agg.tags, ' ') AS tags
            FROM books b 
            INNER JOIN book_author ba ON b.id = ba.book_id
            INNER JOIN authors a ON ba.author_id = a.id
            LEFT JOIN genre_agg ON b.id = genre_agg.book_id
            LEFT JOIN tag_agg ON b.id = tag_agg.book_id
            GROUP BY b.id
          ) AS book_agg ON r.id = book_agg.review_id
          GROUP BY r.id
        ;`,
        { transaction: t },
      );
      await queryInterface.sequelize.query(
        "CREATE INDEX idx_unq_search ON review_search (review_id);",
        { transaction: t },
      );
      await queryInterface.sequelize.query(
        "CREATE INDEX idx_fts_search ON review_search USING gin(doc);",
        { transaction: t },
      );
    });
  },

  async down(queryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.sequelize.query(
        "drop materialized view if exists review_search;",
        { transaction: t },
      );
    });
  },
};
