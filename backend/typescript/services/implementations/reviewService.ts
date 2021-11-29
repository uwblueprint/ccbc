import { Sequelize } from "sequelize-typescript";
import { getErrorMessage } from "../../utilities/errorResponse";
import PgReview from "../../models/review.model";
import PgBook from "../../models/book.model";
import PgTag from "../../models/tag.model";
import PgSeries from "../../models/series.model";
import PgAuthor from "../../models/author.model";
import PgPublisher from "../../models/publisher.model";
import logger from "../../utilities/logger";
import { sequelize } from "../../umzug";
import testSequelize from "../../testUtils/testDb";
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

  constructor(isTest = false) {
    if (isTest) {
      this.db = testSequelize;
    } else {
      this.db = sequelize;
    }
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
              ? new Date(review.publishedAt * 1000)
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
          publishedAt: newReview.published_at
            ? newReview.published_at.getTime() / 1000
            : null,
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
