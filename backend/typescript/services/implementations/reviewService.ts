import { Sequelize } from "sequelize-typescript";
import { getErrorMessage } from "../../utilities/errorResponse";
import PgReview from "../../models/review.model";
import PgBook from "../../models/book.model";
import PgBookAuthor from "../../models/book_author.model";
import PgBookPublisher from "../../models/book_publisher.model";
import PgReviewTag from "../../models/review_tag.model";
import PgTag from "../../models/tag.model";
import PgSeries from "../../models/series.model";
import PgAuthor from "../../models/author.model";
import PgPublisher from "../../models/publisher.model";
import logger from "../../utilities/logger";
import { sequelize } from "../../umzug";
import {
  ReviewRequestDTO,
  IReviewService,
  ReviewResponseDTO,
  Publisher,
  Tag,
  BookResponse,
  AuthorResponse,
} from "../interfaces/IReviewService";

const Logger = logger(__filename);

class ReviewService implements IReviewService {
  db: Sequelize;

  constructor(db: Sequelize = sequelize) {
    this.db = db;
    if (db !== sequelize) sequelize.close(); // Using test db instead of main db
  }

  async deleteReview(id: string): Promise<void> {
    try {
      const deleteResult = await this.db.transaction(async (t) => {
        const reviewToDelete = await PgReview.findByPk(id, {
          transaction: t,
          include: [{ all: true, nested: true }],
        });

        if (!reviewToDelete) {
          throw new Error(`Review id ${id} not found`);
        }

        const allBookIds = reviewToDelete.books.map((book: PgBook) => book.id);
        const deletePublishersAndAuthors = Promise.all(
          reviewToDelete.books.map(async (book: PgBook) => {
            // Delete authors (if necessary)
            book.authors.forEach((author: PgAuthor) => {
              PgBookAuthor.findAll({
                where: { author_id: author.id },
              }).then(async (ret: PgBookAuthor[]) => {
                const bookAuthorIds = ret.map(
                  (bookAuthor: PgBookAuthor) => bookAuthor.book_id,
                );
                if (
                  bookAuthorIds.every((bookId) => allBookIds.includes(bookId))
                ) {
                  // Delete author
                  await PgAuthor.destroy({
                    where: { id: [author.id] },
                  });
                }
              });
            });

            // Delete publishers (if necessary)
            book.publishers.forEach((publisher: PgPublisher) => {
              PgBookPublisher.findAll({
                where: { publisher_id: publisher.id },
              }).then(async (ret: PgBookPublisher[]) => {
                const bookPublisherIds = ret.map(
                  (bookPublisher: PgBookPublisher) => bookPublisher.book_id,
                );
                if (
                  bookPublisherIds.every((bookId) =>
                    allBookIds.includes(bookId),
                  )
                ) {
                  // Delete publisher
                  await PgPublisher.destroy({
                    where: { id: [publisher.id] },
                  });
                }
              });
            });
          }),
        );

        const deleteBooks = Promise.all(
          reviewToDelete.books.map(async (book: PgBook) => {
            // Delete book
            PgBook.destroy({
              where: { id: [book.id] },
            }).then(() => {
              // Delete series (if necessary)
              if (book.series) {
                PgBook.findAll({
                  where: { series_id: book.series.id },
                }).then((ret: PgBook[]) => {
                  // We check for 0 because we deleted the book (can't be 1)
                  if (ret.length === 0) {
                    // Delete series
                    PgSeries.destroy({
                      where: { id: [book.series.id] },
                    });
                  }
                });
              }
            });
          }),
        );

        // Delete tags (if necessary)
        const deleteTags = Promise.all(
          reviewToDelete.tags.map((tag: PgTag) => {
            return PgReviewTag.findAll({
              where: { tag_id: tag.id },
            }).then(async (ret: PgReviewTag[]) => {
              if (ret.length === 1) {
                // Delete tags
                await PgTag.destroy({
                  where: { id: [tag.id] },
                });
              }
            });
          }),
        );

        return Promise.all([
          deletePublishersAndAuthors,
          deleteBooks,
          deleteTags,
        ]).then(() => {
          return PgReview.destroy({
            where: { id: [id] },
          });
        });
      });

      if (!deleteResult) {
        throw new Error(`Review id ${id} not found`);
      }
    } catch (error) {
      Logger.error(
        `Failed to delete Review. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  static pgReviewToRet(review: PgReview): ReviewResponseDTO {
    const books: BookResponse[] = review.books.map((book: PgBook) => {
      const authorsRet: AuthorResponse[] = book.authors.map((a: PgAuthor) => {
        return {
          fullName: a.full_name,
          displayName: a.display_name || null,
          attribution: a.attribution || null,
        };
      });

      const publishersRet: Publisher[] = book.publishers.map(
        (p: PgPublisher) => {
          return {
            fullName: p.full_name,
            publishYear: p.publish_year,
          };
        },
      );

      return {
        title: book.title,
        coverImage: book.cover_image,
        titlePrefix: book.title_prefix || null,
        seriesOrder: book.series_order || null,
        illustrator: book.illustrator || null,
        translator: book.translator || null,
        formats: book.formats || null,
        minAge: book.age_range[0].value,
        maxAge: book.age_range[1].value,
        authors: authorsRet,
        publishers: publishersRet,
        seriesName: book.series?.name || null,
      };
    });

    const tags: Tag[] = review.tags.map((tag: PgTag) => {
      return {
        name: tag.name,
      };
    });

    return {
      reviewId: review.id,
      body: review.body,
      byline: review.byline,
      featured: review.featured,
      books,
      tags,
      updatedAt: review.updatedAt.getTime(),
      publishedAt: review.published_at?.getTime()
        ? review.published_at.getTime()
        : null,
      createdAt: review.createdAt.getTime(),
    };
  }

  async getReview(id: string): Promise<ReviewResponseDTO> {
    let review: PgReview | null;
    let result: ReviewResponseDTO;

    try {
      result = await this.db.transaction(async (t) => {
        review = await PgReview.findByPk(id, {
          transaction: t,
          include: [{ all: true, nested: true }],
        });

        if (!review) {
          throw new Error(`Review id ${id} not found`);
        }

        return ReviewService.pgReviewToRet(review);
      });
    } catch (error: unknown) {
      Logger.error(`Failed to get review. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return result;
  }

  async getReviews(): Promise<ReviewResponseDTO[]> {
    let reviews: PgReview[];
    let result: ReviewResponseDTO[];

    try {
      result = await this.db.transaction(async (t) => {
        reviews = await PgReview.findAll({
          transaction: t,
          include: [{ all: true, nested: true }],
        });

        return reviews.map((r) => ReviewService.pgReviewToRet(r));
      });
    } catch (error: unknown) {
      Logger.error(`Failed to get review. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return result;
  }

  /* eslint-disable class-methods-use-this, no-await-in-loop */
  /*
    as per https://eslint.org/docs/rules/no-await-in-loop, it is recommended to use loops to execute dependent async tasks
  */
  async createReview(review: ReviewRequestDTO): Promise<ReviewResponseDTO> {
    let result: ReviewResponseDTO;

    try {
      result = await this.db.transaction(async (t) => {
        const newReview = await PgReview.create(
          {
            body: review.body,
            byline: review.byline,
            featured: review.featured,
            published_at: review.publishedAt
              ? new Date(review.publishedAt)
              : null,
          },
          { transaction: t },
        );

        const tagsRet: Tag[] = [];
        for (let i = 0; i < review.tags.length; i += 1) {
          const tag = await PgTag.findOrCreate({
            where: { name: review.tags[i].name },
            transaction: t,
          }).then((data) => data[0]);
          await newReview.$add("tags", tag, { transaction: t });
          tagsRet.push({ name: tag.name });
        }

        const booksRet: BookResponse[] = [];
        for (let bIndex = 0; bIndex < review.books.length; bIndex += 1) {
          const book = review.books[bIndex];

          let series = null;
          if (book.seriesName) {
            series = await PgSeries.findOrCreate({
              where: { name: book.seriesName },
              transaction: t,
            }).then((data) => data[0]);
          }

          const newBook = await PgBook.create(
            {
              review_id: newReview.id,
              cover_image: book.coverImage,
              title_prefix: book.titlePrefix,
              title: book.title,
              series_id: series?.id || null,
              series_order: book.seriesOrder || null,
              illustrator: book.illustrator || null,
              translator: book.translator || null,
              formats: book.formats,
              age_range: [book.minAge, book.maxAge],
            },
            { transaction: t },
          );

          const authorsRet: AuthorResponse[] = [];
          for (let index = 0; index < book.authors.length; index += 1) {
            const author = await PgAuthor.findOrCreate({
              where: {
                full_name: book.authors[index].fullName,
                display_name: book.authors[index].displayName || null,
                attribution: book.authors[index].attribution || null,
              },
              transaction: t,
            }).then((data) => data[0]);
            await newBook.$add("authors", author, { transaction: t });
            authorsRet.push({
              fullName: author.full_name,
              displayName: author.display_name || null,
              attribution: author.attribution || null,
            });
          }

          const publishersRet: Publisher[] = [];
          for (let i = 0; i < book.publishers.length; i += 1) {
            const publisher = await PgPublisher.findOrCreate({
              where: {
                full_name: book.publishers[i].fullName,
                publish_year: book.publishers[i].publishYear,
              },
              transaction: t,
            }).then((data) => data[0]);
            await newBook.$add("publishers", publisher, { transaction: t });
            publishersRet.push({
              fullName: publisher.full_name,
              publishYear: publisher.publish_year,
            });
          }

          await newReview.$add("books", newBook, { transaction: t });

          booksRet.push({
            title: newBook.title,
            coverImage: newBook.cover_image,
            titlePrefix: newBook.title_prefix || null,
            seriesOrder: newBook.series_order || null,
            illustrator: newBook.illustrator || null,
            translator: newBook.translator || null,
            formats: newBook.formats,
            minAge: newBook.age_range[0].value,
            maxAge: newBook.age_range[1].value,
            authors: authorsRet,
            publishers: publishersRet,
            seriesName: series?.name || null,
          });
        }

        return {
          reviewId: newReview.id,
          body: newReview.body,
          byline: newReview.byline,
          featured: newReview.featured,
          books: booksRet,
          tags: tagsRet,
          updatedAt: newReview.updatedAt.getTime(),
          publishedAt: newReview.published_at?.getTime()
            ? newReview.published_at.getTime()
            : null,
          createdAt: newReview.createdAt.getTime(),
        };
      });
    } catch (error: unknown) {
      Logger.error(
        `Failed to create entity. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    return result;
  }

  async updateReviews(id: number, entity: ReviewRequestDTO): Promise<void> {
    try {
      const updatedReview = await PgReview.update(
        {
          body: entity.body,
          byline: entity.byline,
          featured: entity.featured,
          books: entity.books,
          tags: entity.tags,
          updatedAt: Date.now(),
        },
        { where: { id }, returning: true },
      );

      if (updatedReview[0] < 1) {
        throw new Error(`id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to update review. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default ReviewService;
