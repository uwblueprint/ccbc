import { resolve } from "path";
import { Sequelize } from "sequelize-typescript";
import PgReview from "../../models/review.model";
import PgBook from "../../models/book.model";
import PgTag from "../../models/tag.model";
import PgSeries from "../../models/series.model";
import PgAuthor from "../../models/author.model";
import PgPublisher from "../../models/publisher.model";
import logger from "../../utilities/logger";
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

// Delete: can delete the book, book_author, and book_publisher
// Get: return review - but it contains all other info

class ReviewService implements IReviewService {
  db: Sequelize;

  constructor() {
    this.db = new Sequelize(
      `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.POSTGRES_DB}`,
      {
        models: [resolve(__dirname, "../../models/*.model.ts")],
        logging: false,
      },
    );
  }

  async getReview(id: string): Promise<ReviewResponseDTO> {
    let review: PgReview | null;
    let result: ReviewResponseDTO;

    try {
      result = await this.db.transaction(async (t) => {
        review = await PgReview.findByPk(id, { raw: true, transaction: t });
        if (!review) {
          throw new Error(`Review id ${id} not found`);
        }

        const pgBooks = await review.$get("books");
        const books: Book[] = await Promise.all(
          pgBooks.map(async (book: PgBook) => {
            const series = await book.$get("series");

            const authorsRet: Author[] = await Promise.all(
              book.authors.map((a: PgAuthor) => {
                return {
                  fullName: a.full_name,
                  displayName: a.display_name,
                  attribution: a.attribution,
                };
              }),
            );

            const publishersRet: Publisher[] = await Promise.all(
              book.publishers.map(async (p: PgPublisher) => {
                return {
                  fullName: p.full_name,
                  publishYear: p.publish_year,
                };
              }),
            );

            return {
              title: book.title,
              seriesOrder: book.series_order,
              illustrator: book.illustrator,
              translator: book.translator,
              formats: book.formats,
              minAge: book.age_range[0].value,
              maxAge: book.age_range[1].value,
              authors: authorsRet,
              publishers: publishersRet,
              seriesName: series?.name,
            };
          }),
        );

        const pgTags = await review.$get("tags");
        const tags: Tag[] = await Promise.all(
          pgTags.map((t: PgTag) => {
            return {
              name: t.name,
            };
          }),
        );

        return {
          reviewId: review.id,
          body: review.body,
          cover_images: review.cover_images,
          byline: review.byline,
          featured: review.featured,
          books,
          tags,
          updatedAt: review.updatedAt.getTime(),
          publishedAt: review.published_at.getTime(),
        };
      });
    } catch (error: unknown) {
      Logger.error(`Failed to get review. Reason = ${error}`);
      throw error;
    }

    return result;
  }

  /* eslint-disable class-methods-use-this */
  async createReview(review: ReviewRequestDTO): Promise<ReviewResponseDTO> {
    let newReview: PgReview;
    let newBook: PgBook;
    let tag: PgTag;
    let series: PgSeries;
    let author: PgAuthor;
    let publisher: PgPublisher;
    let result: ReviewResponseDTO;

    try {
      result = await this.db.transaction(async (t) => {
        newReview = await PgReview.create(
          {
            body: review.body,
            cover_images: review.coverImages,
            byline: review.byline,
            featured: review.featured,
            published_at: review.publishedAt
              ? new Date(review.publishedAt * 1000)
              : null,
          },
          { transaction: t },
        );

        const tagsRet: PgTag[] = await Promise.all(
          review.tags.map(async (reviewTag) => {
            tag = await PgTag.findOrCreate({
              where: { name: reviewTag.name },
              transaction: t,
            }).then((data) => data[0]);
            await newReview.$add("tags", tag, { transaction: t });
            return tag;
          }),
        );

        const booksRet: Book[] = await Promise.all(
          review.books.map(async (book: Book) => {
            series = await PgSeries.findOrCreate({
              where: { name: book.seriesName },
              transaction: t,
            }).then((data) => data[0]);

            newBook = await PgBook.create(
              {
                review_id: newReview.id,
                title_prefix: book.titlePrefix,
                title: book.title,
                series_id: series.id,
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
                author = await PgAuthor.findOrCreate({
                  where: {
                    full_name: a.fullName,
                    display_name: a.displayName || null,
                    attribution: a.attribution || null,
                  },
                  transaction: t,
                }).then((data) => data[0]);
                newBook.$add("authors", author, { transaction: t });
                return {
                  fullName: author.full_name,
                  displayName: author.display_name,
                  attribution: author.attribution,
                };
              }),
            );

            const publishersRet: Publisher[] = await Promise.all(
              book.publishers.map(async (p) => {
                publisher = await PgPublisher.findOrCreate({
                  where: {
                    full_name: p.fullName,
                    publish_year: p.publishYear,
                  },
                  transaction: t,
                }).then((data) => data[0]);
                return {
                  fullName: publisher.full_name,
                  publishYear: publisher.publish_year,
                };
              }),
            );

            await newBook.$add("publishers", publisher, { transaction: t });
            await newReview.$add("books", newBook, { transaction: t });
            return {
              title: newBook.title,
              seriesOrder: newBook.series_order,
              illustrator: newBook.illustrator,
              translator: newBook.translator,
              formats: newBook.formats,
              minAge: newBook.age_range[0].value,
              maxAge: newBook.age_range[1].value,
              authors: authorsRet,
              publishers: publishersRet,
              seriesName: series.name,
            };
          }),
        );

        return {
          reviewId: newReview.id,
          body: newReview.body,
          cover_images: newReview.cover_images,
          byline: newReview.byline,
          featured: newReview.featured,
          books: booksRet,
          tags: tagsRet,
          updatedAt: newReview.updatedAt.getTime(),
          publishedAt: newReview.published_at.getTime(),
        };
      });
    } catch (error: unknown) {
      Logger.error(`Failed to create entity. Reason = ${error}`);
      throw error;
    }

    return result;
  }
}

export default ReviewService;
