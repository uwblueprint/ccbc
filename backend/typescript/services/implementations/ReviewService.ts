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
} from "../interfaces/IReviewService";

const Logger = logger(__filename);

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
            published_at: review.publishedAt || null,
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
              // TODO: change hard-coded values
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
          updatedAt: newReview.updatedAt,
          publishedAt: newReview.published_at,
        };
      });
    } catch (error) {
      Logger.error(`Failed to create entity. Reason = ${error.message}`);
      throw error;
    }

    return result;
  }
}

export default ReviewService;
