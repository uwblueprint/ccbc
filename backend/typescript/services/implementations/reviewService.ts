import { Sequelize } from "sequelize-typescript";
import { Transaction } from "sequelize/types";
import { getErrorMessage } from "../../utilities/errorResponse";
import PgReview from "../../models/review.model";
import PgBook from "../../models/book.model";
import PgBookAuthor from "../../models/book_author.model";
import PgBookPublisher from "../../models/book_publisher.model";
// import PgReviewTag from "../../models/review_tag.model";
import PgSeries from "../../models/series.model";
import PgAuthor from "../../models/author.model";
import PgPublisher from "../../models/publisher.model";
import logger from "../../utilities/logger";
import { sequelize } from "../../umzug";
import {
  ReviewRequestDTO,
  IReviewService,
  ReviewResponseDTO,
  BookResponse,
  BookRequest,
  AuthorResponse,
  AuthorRequest,
  TagRequest,
  PublisherRequest,
  PublisherResponse,
  TagResponse,
  User,
} from "../interfaces/IReviewService";
import Tag from "../../models/tag.model";

const Logger = logger(__filename);

class ReviewService implements IReviewService {
  db: Sequelize;

  constructor(db: Sequelize = sequelize) {
    this.db = db;
    if (db !== sequelize) sequelize.close(); // Using test db instead of main db
  }

  /* eslint-disable class-methods-use-this */
  async findOrCreateTag(
    review: PgReview,
    tag: TagRequest,
    t: Transaction,
  ): Promise<Tag> {
    const [tagRef, created] = await Tag.findOrCreate({
      where: { name: tag.name },
      transaction: t,
    });
    if (!created) return tagRef;

    // TODO implement Tags API changes
    // await review.$add("tags", tagRef, { transaction: t });
    return tagRef;
  }

  async findOrCreateTags(
    review: PgReview,
    tags: TagRequest[],
    t: Transaction,
  ): Promise<TagResponse[]> {
    const tagsRespRes: Promise<Tag>[] = [];
    for (let i = 0; i < tags.length; i += 1) {
      tagsRespRes.push(this.findOrCreateTag(review, tags[i], t));
    }

    const tagsRes: Tag[] = await Promise.all(tagsRespRes);

    const tagsRet: TagResponse[] = tagsRes.map((tag) => ({
      id: tag.id,
      name: tag.name,
    }));

    return tagsRet;
  }

  async findOrCreateSeries(
    seriesName: string | null | undefined,
    t: Transaction,
  ): Promise<PgSeries | null> {
    let series = null;
    let created = false;
    if (seriesName) {
      [series, created] = await PgSeries.findOrCreate({
        where: { name: seriesName },
        transaction: t,
      });
      if (!created) return series;
    }
    return series;
  }

  async findOrCreateAuthor(
    book: PgBook,
    author: AuthorRequest,
    t: Transaction,
  ): Promise<PgAuthor> {
    const authorRef = await PgAuthor.findOrCreate({
      where: {
        full_name: author.fullName,
        display_name: author.displayName || null,
        attribution: author.attribution || null,
      },
      transaction: t,
    }).then((res) => res[0]);
    await book.$add("authors", authorRef, { transaction: t });
    return authorRef;
  }

  async findOrCreatePublisher(
    book: PgBook,
    publisher: PublisherRequest,
    t: Transaction,
  ): Promise<PgPublisher> {
    const pub = await PgPublisher.findOrCreate({
      where: {
        full_name: publisher.fullName,
        publish_year: publisher.publishYear,
      },
      transaction: t,
    }).then((res) => res[0]);
    await book.$add("publishers", pub, { transaction: t });
    return pub;
  }

  async createBook(
    review: PgReview,
    book: BookRequest,
    t: Transaction,
  ): Promise<BookResponse> {
    const series = book.series
      ? await this.findOrCreateSeries(book.series.name, t)
      : undefined;

    const newBook = await PgBook.create(
      {
        review_id: review.id,
        cover_image: book.coverImage,
        title_prefix: book.titlePrefix,
        title: book.title,
        series_id: series?.id || null,
        series_order: book.seriesOrder || null,
        illustrator: book.illustrator || null,
        translator: book.translator || null,
        formats: book.formats,
        age_range: [
          { value: book.minAge, inclusive: true },
          { value: book.maxAge, inclusive: true },
        ],
      },
      { transaction: t },
    );

    const authorsRes: Promise<PgAuthor>[] = [];
    book.authors.forEach((author) => {
      authorsRes.push(this.findOrCreateAuthor(newBook, author, t));
    });

    const authors = await Promise.all(authorsRes);
    const authorsRet: AuthorResponse[] = authors.map((author) => ({
      id: author.id,
      fullName: author.full_name,
      displayName: author.display_name || null,
      attribution: author.attribution || null,
    }));

    const publishersRes: Promise<PgPublisher>[] = [];
    book.publishers.forEach((publisher) => {
      publishersRes.push(this.findOrCreatePublisher(newBook, publisher, t));
    });

    const publishers = await Promise.all(publishersRes);
    const publishersRet: PublisherResponse[] = publishers.map((publisher) => ({
      id: publisher.id,
      fullName: publisher.full_name,
      publishYear: publisher.publish_year,
    }));

    await review.$add("books", newBook, { transaction: t });
    return {
      id: newBook.id,
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
      series: {
        id: series?.id || null,
        name: series?.name || null,
      },
    };
  }

  // if deleteReview is called without parameter txn, it runs in a try catch block
  // otherwise, deleteReview should be called inside a try catch block with t as parameter
  async deleteReview(id: string, txn?: Transaction): Promise<void> {
    if (txn) {
      const deleteResult = await this.deleteReviewHelper(id, txn);
      if (!deleteResult) {
        throw new Error(`Review id ${id} not found`);
      }
      return;
    }

    try {
      const deleteResult = await this.db.transaction(async (t) =>
        this.deleteReviewHelper(id, t),
      );
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

  async deleteReviewHelper(id: string, txn: Transaction): Promise<number> {
    const reviewToDelete = await PgReview.findByPk(id, {
      transaction: txn,
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
            if (bookAuthorIds.every((bookId) => allBookIds.includes(bookId))) {
              // Delete author
              await PgAuthor.destroy({
                where: { id: [author.id] },
                transaction: txn,
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
              bookPublisherIds.every((bookId) => allBookIds.includes(bookId))
            ) {
              // Delete publisher
              await PgPublisher.destroy({
                where: { id: [publisher.id] },
                transaction: txn,
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
          transaction: txn,
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
                  transaction: txn,
                });
              }
            });
          }
        });
      }),
    );

    const deleteResult = await Promise.all([
      deletePublishersAndAuthors,
      deleteBooks,
    ]).then(() => {
      return PgReview.destroy({
        where: { id: [id] },
        transaction: txn,
      });
    });

    return deleteResult;
  }

  static pgReviewToRet(review: PgReview): ReviewResponseDTO {
    const books: BookResponse[] = review.books.map((book: PgBook) => {
      const authorsRet: AuthorResponse[] = book.authors.map((a: PgAuthor) => {
        return {
          id: a.id,
          fullName: a.full_name,
          displayName: a.display_name || null,
          attribution: a.attribution || null,
        };
      });

      const publishersRet: PublisherResponse[] = book.publishers.map(
        (p: PgPublisher) => {
          return {
            id: p.id,
            fullName: p.full_name,
            publishYear: p.publish_year,
          };
        },
      );

      return {
        id: book.id,
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
        series: {
          id: book.series?.id || null,
          name: book.series?.name || null,
        },
      };
    });

    // const tags: TagResponse[] = review.tags.map((tag: Tag) => {
    //   return {
    //     id: tag.id,
    //     name: tag.name,
    //   };
    // });

    return {
      reviewId: review.id,
      body: review.body,
      byline: review.byline,
      featured: review.featured,
      createdByUser: this.getUserDetails(review),
      books,
      updatedAt: review.updatedAt.getTime(),
      publishedAt: review.published_at?.getTime()
        ? review.published_at.getTime()
        : null,
      createdAt: review.createdAt.getTime(),
    };
  }

  static getUserDetails(review: PgReview): User {
    const user: User = {
      id: review.created_by.id,
      firstName: review.created_by.first_name,
      lastName: review.created_by.last_name,
    };

    return user;
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

  // if createReview is called without parameter txn, it runs in a try catch block
  // otherwise, createReview should be called inside a try catch block with t as parameter
  async createReview(
    review: ReviewRequestDTO,
    id?: string,
    txn?: Transaction,
  ): Promise<ReviewResponseDTO> {
    let result: ReviewResponseDTO;

    if (txn) {
      result = await this.createReviewHelper(review, txn, id);
      return result;
    }

    try {
      result = await this.db.transaction(async (t) =>
        this.createReviewHelper(review, t, id),
      );
    } catch (error: unknown) {
      Logger.error(
        `Failed to create entity. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    return result;
  }

  async createReviewHelper(
    review: ReviewRequestDTO,
    txn: Transaction,
    id?: string,
  ): Promise<ReviewResponseDTO> {
    const newReview = await PgReview.create(
      {
        body: review.body,
        byline: review.byline,
        featured: review.featured,
        created_by_id: review.createdBy,
        published_at: review.publishedAt ? new Date(review.publishedAt) : null,
        ...(id ? { id } : {}),
      },
      { transaction: txn },
    );

    const booksRes: Promise<BookResponse>[] = [];
    review.books.forEach((book) => {
      booksRes.push(this.createBook(newReview, book, txn));
    });

    const booksRet: BookResponse[] = await Promise.all(booksRes);

    return {
      reviewId: newReview.id,
      body: newReview.body,
      byline: newReview.byline,
      featured: newReview.featured,
      createdBy: newReview.created_by_id,
      books: booksRet,
      updatedAt: newReview.updatedAt.getTime(),
      publishedAt: newReview.published_at?.getTime()
        ? newReview.published_at.getTime()
        : null,
      createdAt: newReview.createdAt.getTime(),
    };
  }

  async updateReviews(id: string, entity: ReviewRequestDTO): Promise<void> {
    const t = await this.db.transaction();
    try {
      await this.deleteReview(id, t);
      await this.createReview(entity, id, t);
      await t.commit();
    } catch (error: unknown) {
      await t.rollback();
      Logger.error(
        `Failed to update review. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default ReviewService;
