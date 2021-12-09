import { Sequelize } from "sequelize-typescript";
import { getErrorMessage } from "../../utilities/errorResponse";
import PgReview from "../../models/review.model";
import PgBook from "../../models/book.model";
import PgBookAuthor from "../../models/book_author.model";
import PgBookPublisher from "../../models/book_publisher.model";
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
  Author,
  Publisher,
  Tag,
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

            reviewToDelete.books.forEach((book: PgBook)  => {
                // Delete authors (if necessary)
                book.authors.forEach((author: PgAuthor) => {
                    const bookAuthors = PgBookAuthor.findAll({
                        where: { author_id: author.id }, 
                    });
                    if ( bookAuthors.length <= 1 ) { // Delete author
                        PgAuthor.destroy({
                            where: { id: [ author.id ] },
                        });
                        PgBookAuthor.destroy({
                            where: { author_id: author.id },
                        });
                    }
                });

                // Delete publishers (if necessary)
                book.publishers.forEach((publisher: PgPublisher) => {
                    const bookPublishers = PgBookPublisher.findAll({
                        where: { publisher_id: publisher.id }, 
                    });
                    if ( bookPublishers.length <= 1 ) { // Delete author
                        PgPublisher.destroy({
                            where: { id: [ publisher.id ] },
                        });
                        PgBookPublisher.destroy({
                            where: { publisher_id: publisher.id },
                        });
                    }
                });

                // Delete series (if necessary)
                const booksInSeries = PgBook.findAll({
                    where: { series_id: book.series.id }, 
                });
                if ( booksInSeries.length <= 1 ) { // Delete author
                    PgSeries.destroy({
                        where: { id: [ series_id ] },
                    });
                }
            });

            // Delete books
            reviewToDelete.books.forEach((book: PgBook) => {
                PgBook.destroy({
                    where: { id: [ book.id ] }
                });
            });
            
            // Delete tags (if necessary)
            reviewToDelete.tags.forEach((tag: PgTag) => {
                const reviewTags = PgReviewTag.findAll({
                    where: { tag_id: tag.id }, 
                });
                if ( reviewTags.length <= 1 ) { // Delete author
                    PgTag.destroy({
                        where: { id: [ tag.id ] },
                    });
                    PgReviewTag.destroy({
                        where: { tag_id: tag.id },
                    });
                }
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
  
  pgReviewToRet(review: PgReview): ReviewResponseDTO {
    const books: Book[] =
        review.books.map((book: PgBook) => {

            const authorsRet: Author[] =
            book.authors.map((a: PgAuthor) => {
                return {
                fullName: a.full_name,
                displayName: a.display_name,
                attribution: a.attribution,
                };
            });

            const publishersRet: Publisher[] = 
            book.publishers.map((p: PgPublisher) => {
                return {
                fullName: p.full_name,
                publishYear: p.publish_year,
                };
            });

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

    // const pgTags = await review.$get("tags");
    const tags: Tag[] = 
        review.tags.map((tag: PgTag) => {
            return {
            name: tag.name,
            };
        });

    return {
        reviewId: review.id,
        body: review.body,
        byline: review.byline,
        featured: review.featured,
        books: books,
        tags: tags,
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

        return this.pgReviewToRet(review);
      });
    } catch (error: unknown) {
      Logger.error(`Failed to get review. Reason = ${error}`);
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
        
        return reviews.map((r) => this.pgReviewToRet(r));
      });
    } catch (error: unknown) {
      Logger.error(`Failed to get review. Reason = ${error}`);
      throw error;
    }

    return result;
  }

  /* eslint-disable class-methods-use-this */
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

        const tagsRet: Tag[] = await Promise.all(
          review.tags.map(async (reviewTag) => {
            const tag = await PgTag.findOrCreate({
              where: { name: reviewTag.name },
              transaction: t,
            }).then((data) => data[0]);
            await newReview.$add("tags", tag, { transaction: t });
            return { name: tag.name };
          }),
        );

        const booksRet: Book[] = await Promise.all(
          review.books.map(async (book: Book) => {
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

            const authorsRet: Author[] = await Promise.all(
              book.authors.map(async (a) => {
                const author = await PgAuthor.findOrCreate({
                  where: {
                    full_name: a.fullName,
                  },
                  defaults: {
                    display_name: a.displayName || null,
                    attribution: a.attribution || null,
                  },
                  transaction: t,
                }).then((data) => data[0]);
                await newBook.$add("authors", author, { transaction: t });

                return {
                  fullName: author.full_name,
                  displayName: author.display_name,
                  attribution: author.attribution,
                };
              }),
            );

            const publishersRet: Publisher[] = await Promise.all(
              book.publishers.map(async (p) => {
                const publisher = await PgPublisher.findOrCreate({
                  where: {
                    full_name: p.fullName,
                    publish_year: p.publishYear,
                  },
                  transaction: t,
                }).then((data) => data[0]);
                await newBook.$add("publishers", publisher, { transaction: t });
                return {
                  fullName: publisher.full_name,
                  publishYear: publisher.publish_year,
                };
              }),
            );

            await newReview.$add("books", newBook, { transaction: t });

            return {
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
            };
          }),
        );

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
