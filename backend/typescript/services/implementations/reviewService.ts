import { Sequelize } from "sequelize-typescript";
import { IncludeThroughOptions, Op, OrderItem } from "sequelize";
import { Transaction } from "sequelize/types";
import { getErrorMessage } from "../../utilities/errorResponse";
import PgReview from "../../models/review.model";
import PgBook from "../../models/book.model";
import PgBookAuthor from "../../models/book_author.model";
import PgBookPublisher from "../../models/book_publisher.model";
import PgBookGenre from "../../models/book_genre.model";
import PgBookTag from "../../models/book_tag.model";
import PgTag from "../../models/tag.model";
import PgSeries from "../../models/series.model";
import PgAuthor from "../../models/author.model";
import PgPublisher from "../../models/publisher.model";
import PgGenre from "../../models/genre.model";
import PgUser from "../../models/user.model";
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
  PublisherRequest,
  PublisherResponse,
  User,
  Genre,
  Tag,
  PaginatedReviewResponseDTO,
} from "../interfaces/IReviewService";

const Logger = logger(__filename);

class ReviewService implements IReviewService {
  db: Sequelize;

  constructor(db: Sequelize = sequelize) {
    this.db = db;
    if (db !== sequelize) sequelize.close(); // Using test db instead of main db
  }

  /* eslint-disable class-methods-use-this */
  async findOrCreateTag(
    book: PgBook,
    tag: Tag,
    t: Transaction,
  ): Promise<PgTag> {
    const [tagRef] = await PgTag.findOrCreate({
      where: { name: tag.name },
      transaction: t,
    });
    await book.$add("tags", tagRef, { transaction: t });
    return tagRef;
  }

  async findOrCreateTags(
    book: PgBook,
    tags: Tag[],
    t: Transaction,
  ): Promise<Tag[]> {
    const tagsRespRes: Promise<PgTag>[] = [];
    for (let i = 0; i < tags.length; i += 1) {
      tagsRespRes.push(this.findOrCreateTag(book, tags[i], t));
    }

    const tagsRes: PgTag[] = await Promise.all(tagsRespRes);

    const tagsRet: Tag[] = tagsRes.map((tag) => ({
      name: tag.name,
    }));

    return tagsRet;
  }

  /* eslint-disable class-methods-use-this, no-await-in-loop */
  async findOrCreateGenre(
    book: PgBook,
    genre: Genre,
    t: Transaction,
  ): Promise<PgGenre> {
    const genreRef = await PgGenre.findOrCreate({
      where: { name: genre.name },
      transaction: t,
    }).then((res) => res[0]);
    await book.$add("genres", genreRef, { transaction: t });
    return genreRef;
  }

  async findOrCreateGenres(
    book: PgBook,
    genres: Genre[],
    t: Transaction,
  ): Promise<Genre[]> {
    const genresRet: Genre[] = [];
    for (let i = 0; i < genres.length; i += 1) {
      const genre = await this.findOrCreateGenre(book, genres[i], t);
      genresRet.push({ name: genre.name });
    }
    return genresRet;
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
    const tagsRet = await this.findOrCreateTags(newBook, book.tags || [], t);

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

    const genresRet: Genre[] = await this.findOrCreateGenres(
      newBook,
      book.genres || [],
      t,
    );

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
      genres: genresRet,
      publishers: publishersRet,
      series: {
        id: series?.id || null,
        name: series?.name || null,
      },
      tags: tagsRet,
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

  async deleteReviewHelper(id: string, txn: Transaction): Promise<boolean> {
    const reviewToDelete = await PgReview.findByPk(id, {
      transaction: txn,
      include: [{ all: true, nested: true }],
    });

    if (!reviewToDelete) {
      throw new Error(`Review id ${id} not found`);
    }

    const allBookIds = reviewToDelete.books.map((book: PgBook) => book.id);

    await Promise.all(
      reviewToDelete.books.map(async (book: PgBook) => {
        // Delete book
        await PgBook.destroy({
          where: { id: [book.id] },
          transaction: txn,
        });

        // TODO: can end up deleting the same author/publisher/series twice if
        // there are books in the same review with the same author/publisher/series.
        // fix this by grouping them into sets and iterating over those instead of the books

        // Delete authors (if necessary)
        book.authors.forEach(async (author: PgAuthor) => {
          const authorsOtherBooks = await PgBookAuthor.findAll({
            where: {
              author_id: author.id,
              book_id: { [Op.notIn]: allBookIds },
            },
          });
          if (authorsOtherBooks.length === 0) {
            // Delete author
            await PgAuthor.destroy({
              where: { id: [author.id] },
              transaction: txn,
            });
          }
        });

        // Delete genres (if necessary)
        if (book.genres.length > 0) {
          const genresToDel: string[] = [];

          /* eslint-disable no-await-in-loop */
          /* eslint-disable-next-line no-restricted-syntax */
          for (const genre of book.genres) {
            const genresOtherBooks = await PgBookGenre.findAll({
              where: {
                genre_name: genre.name,
                book_id: { [Op.notIn]: allBookIds },
              },
            });
            if (genresOtherBooks.length === 0) {
              genresToDel.push(genre.name);
            }
          }
          /* eslint-enable no-await-in-loop */

          await PgGenre.destroy({
            where: { name: genresToDel },
            transaction: txn,
          });
        }

        // Delete publishers (if necessary)
        book.publishers.forEach(async (publisher: PgPublisher) => {
          const publishersOtherBooks = await PgBookPublisher.findAll({
            where: {
              publisher_id: publisher.id,
              book_id: { [Op.notIn]: allBookIds },
            },
          });
          if (publishersOtherBooks.length === 0) {
            // Delete publisher
            await PgPublisher.destroy({
              where: { id: [publisher.id] },
              transaction: txn,
            });
          }
        });

        // Delete series (if necessary)
        if (book.series) {
          const seriesOtherBooks = await PgBook.findAll({
            where: {
              series_id: book.series.id,
              id: { [Op.notIn]: allBookIds },
            },
          });
          if (seriesOtherBooks.length === 0) {
            // Delete series
            await PgSeries.destroy({
              where: { id: [book.series.id] },
              transaction: txn,
            });
          }
        }

        // Delete tags (if necessary)
        if (book.tags.length > 0) {
          const tagsToDel: string[] = [];

          // TODO make this cleaner
          /* eslint-disable no-await-in-loop */
          /* eslint-disable-next-line no-restricted-syntax */
          for (const tag of book.tags) {
            const tagsOtherBooks = await PgBookTag.findAll({
              where: {
                tag_name: tag.name,
                book_id: { [Op.notIn]: allBookIds },
              },
            });
            if (tagsOtherBooks.length === 0) {
              tagsToDel.push(tag.name);
            }
          }
          /* eslint-enable no-await-in-loop */

          await PgTag.destroy({
            where: { name: tagsToDel },
            transaction: txn,
          });
        }
      }),
    );

    await PgReview.destroy({
      where: { id: [id] },
      transaction: txn,
    });

    return true;
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

      const genresRet: Genre[] = book.genres.map((p: PgGenre) => {
        return {
          name: p.name,
        };
      });

      const TagsRet: Tag[] = book.tags.map((t: PgTag) => {
        return {
          name: t.name,
        };
      });

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
        genres: genresRet,
        publishers: publishersRet,
        series: {
          id: book.series?.id || null,
          name: book.series?.name || null,
        },
        tags: TagsRet,
      };
    });

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

  getPaginationOffset(page: string, limit: number | undefined): number {
    const offset = page && limit ? parseInt(page, 10) * limit : 0;
    return offset;
  }

  async getReviews(
    page: string,
    size: string,
    genres?: string[],
    minAge?: number,
    maxAge?: number,
    featured?: string,
    author?: string,
  ): Promise<PaginatedReviewResponseDTO> {
    let result: PaginatedReviewResponseDTO;

    try {
      result = await this.db.transaction(async (t) => {
        const limit = size ? parseInt(size, 10) : undefined;
        const offset = this.getPaginationOffset(page, limit);

        // Possible filter query parameters
        const featureOpt = featured ? { featured } : {};
        const minAgeOpt = minAge || 0;
        const maxAgeOpt = maxAge || 100;

        // TO DO: add findAndCountAll and make sure it works **
        const { rows, count } = await PgReview.findAndCountAll({
          transaction: t,
          where: {
            [Op.and]: [
              Sequelize.where(Sequelize.col(`books.id`), Op.ne, null),
              featureOpt,
            ],
          },
          include: [
            {
              model: PgUser,
            },
            {
              model: PgBook,
              where: {
                ...((minAge || maxAge) && {
                  age_range: {
                    [Op.overlap]: [minAgeOpt, maxAgeOpt],
                  },
                }),
              },
              include: [
                {
                  model: PgGenre,
                  through: PgBookGenre as IncludeThroughOptions,
                  required: true,
                  where: {
                    ...(genres &&
                      genres.length && {
                        name: {
                          [Op.in]: genres,
                        },
                      }),
                  },
                },
                {
                  model: PgAuthor,
                  through: PgBookAuthor as IncludeThroughOptions,
                  include: [
                    {
                      all: true,
                    },
                  ],
                },
                {
                  model: PgPublisher,
                  through: PgBookPublisher as IncludeThroughOptions,
                  include: [
                    {
                      all: true,
                    },
                  ],
                },
                {
                  model: PgTag,
                  through: PgBookTag as IncludeThroughOptions,
                  include: [
                    {
                      all: true,
                    },
                  ],
                },
                {
                  model: PgSeries,
                  include: [
                    {
                      all: true,
                    },
                  ],
                },
              ],
            },
          ],
          limit,
          offset,
          subQuery: false,
          distinct: true,
          col: "id",
        });

        // The currentPage is the page we requested in params or just page 0
        const currentPage = page ? parseInt(page, 10) : 0;

        // There is only one page if we are not paginating them
        const totalPages = limit ? Math.ceil(count / limit) : 1;

        return {
          totalReviews: count,
          totalPages,
          currentPage,
          reviews: rows.map((r: PgReview) => ReviewService.pgReviewToRet(r)),
        };
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
