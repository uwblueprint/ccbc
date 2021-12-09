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
}

export default ReviewService;
