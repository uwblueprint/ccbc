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
  Book,
  Publisher,
  Tag,
  Author,
} from "../interfaces/IReviewService";

const Logger = logger(__filename);

class ReviewService implements IReviewService {
  db: Sequelize;

  constructor(db: Sequelize = sequelize) {
    this.db = db;
    if (db !== sequelize) sequelize.close(); // Using test db instead of main db
  }

// TODO: deal with bug: lets say we have 2 reviews all the same tag (and only that tag). if one of the reviews get deleted, the tag gets deleted (but it shouldn't)
// not recreatable when it's 3 reviews instead of 2
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

            reviewToDelete.books.forEach((book: PgBook)  => {
                // Delete authors (if necessary)
                book.authors.forEach((author: PgAuthor) => {
                    PgBookAuthor.findAll({
                        where: { author_id: author.id }, 
                    }).then( (ret: PgBookAuthor[]) => {
                        if ( ret.length <= 1 ) { // Delete author
                            PgAuthor.destroy({
                                where: { id: [ author.id ] },
                            });
                        }
                        PgBookAuthor.destroy({
                            where: { book_id: book.id },
                        });
                    });
                });

                // Delete publishers (if necessary)
                book.publishers.forEach((publisher: PgPublisher) => {
                    PgBookPublisher.findAll({
                        where: { publisher_id: publisher.id }, 
                    }).then( (ret: PgBookPublisher[]) => {
                        if ( ret.length <= 1 ) { // Delete publisher
                            PgPublisher.destroy({
                                where: { id: [ publisher.id ] },
                            });
                        }
                        PgBookPublisher.destroy({
                            where: { book_id: book.id },
                        });
                    });
                });

                // Delete series (if necessary)
                PgBook.findAll({
                    where: { series_id: book.series.id }, 
                }).then( (ret: PgBook[]) => {
                    if ( ret.length <= 1 ) { // Delete series
                        PgSeries.destroy({
                            where: { id: [ book.series.id ] },
                        });
                    }      
                });
            });

            // Delete tags (if necessary)
            reviewToDelete.tags.forEach((tag: PgTag) => {
                const reviewTags = PgReviewTag.findAll({
                    where: { tag_id: tag.id }, 
                }).then( (ret: PgReviewTag[]) => {
                    if ( ret.length <= 1 ) { // Delete tags
                        PgTag.destroy({
                            where: { id: [ tag.id ] },
                        });
                    }
                    PgReviewTag.destroy({
                        where: { review_id: id },
                    });
                });
            });

            // Delete books
            reviewToDelete.books.forEach((book: PgBook) => {
                PgBook.destroy({
                    where: { id: [ book.id ] }
                });
            });

            return await PgReview.destroy({
                where: { id: [ id ] },
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
    const books: Book[] = review.books.map((book: PgBook) => {
      const authorsRet: Author[] = book.authors.map((a: PgAuthor) => {
        return {
          fullName: a.full_name,
          displayName: a.display_name,
          attribution: a.attribution,
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
        titlePrefix: book.title_prefix,
        seriesOrder: book.series_order,
        illustrator: book.illustrator,
        translator: book.translator,
        formats: book.formats,
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

        const booksRet: Book[] = [];
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

          const authorsRet: Author[] = [];
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
              displayName: author.display_name,
              attribution: author.attribution,
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
            titlePrefix: newBook.title_prefix,
            seriesOrder: newBook.series_order,
            illustrator: newBook.illustrator,
            translator: newBook.translator,
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
}

export default ReviewService;
