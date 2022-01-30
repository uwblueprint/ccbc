import { Sequelize } from "sequelize-typescript";
import { Transaction } from "sequelize/types";
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
  BookRequest,
  AuthorResponse,
  AuthorRequest,
} from "../interfaces/IReviewService";

const Logger = logger(__filename);

class ReviewService implements IReviewService {
  db: Sequelize;

  constructor(db: Sequelize = sequelize) {
    this.db = db;
    if (db !== sequelize) sequelize.close(); // Using test db instead of main db
  }

  /* eslint-disable class-methods-use-this, no-await-in-loop */
  async findOrCreateTag(
    review: PgReview,
    tag: Tag,
    t: Transaction,
  ): Promise<PgTag> {
    const newTag = await PgTag.findOrCreate({
      where: { name: tag.name },
      transaction: t,
    }).then((data) => data[0]);
    await review.$add("tags", newTag, { transaction: t });
    return newTag;
  }

  async findOrCreateTags(
    review: PgReview,
    tags: Tag[],
    t: Transaction,
  ): Promise<Tag[]> {
    const tagsRet: Tag[] = [];
    for (let i = 0; i < tags.length; i += 1) {
      const tag = await this.findOrCreateTag(review, tags[i], t);
      tagsRet.push({ name: tag.name });
    }
    return tagsRet;
  }

  async findOrCreateSeries(
    seriesName: string | null | undefined,
    t: Transaction,
  ): Promise<PgSeries | null> {
    let series = null;
    if (seriesName) {
      series = await PgSeries.findOrCreate({
        where: { name: seriesName },
        transaction: t,
      }).then((data) => data[0]);
    }

    return series;
  }

  async findOrCreateAuthor(
    book: PgBook,
    author: AuthorRequest,
    t: Transaction,
  ): Promise<PgAuthor> {
    const newAuthor = await PgAuthor.findOrCreate({
      where: {
        full_name: author.fullName,
        display_name: author.displayName || null,
        attribution: author.attribution || null,
      },
      transaction: t,
    }).then((data) => data[0]);
    // @TODO: check this
    await book.$add("authors", newAuthor, { transaction: t });
    return newAuthor;
  }

  async findOrCreatePublisher(
    book: PgBook,
    publisher: Publisher,
    t: Transaction,
  ): Promise<PgPublisher> {
    const pub = await PgPublisher.findOrCreate({
      where: {
        full_name: publisher.fullName,
        publish_year: publisher.publishYear,
      },
      transaction: t,
    }).then((data) => data[0]);
    // @TOOD: look at this ~Omar
    await book.$add("publishers", pub, { transaction: t });
    return pub;
  }

  async createBook(
    review: PgReview,
    book: BookRequest,
    t: Transaction,
  ): Promise<BookResponse> {
    const series = await this.findOrCreateSeries(book.seriesName, t);

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
        age_range: [book.minAge, book.maxAge],
      },
      { transaction: t },
    );

    const authorsRet: AuthorResponse[] = [];
    for (let index = 0; index < book.authors.length; index += 1) {
      const author = await this.findOrCreateAuthor(
        newBook,
        book.authors[index],
        t,
      );
      authorsRet.push({
        fullName: author.full_name,
        displayName: author.display_name || null,
        attribution: author.attribution || null,
      });
    }

    const publishersRet: Publisher[] = [];
    for (let i = 0; i < book.publishers.length; i += 1) {
      const publisher = await this.findOrCreatePublisher(
        newBook,
        book.publishers[i],
        t,
      );
      publishersRet.push({
        fullName: publisher.full_name,
        publishYear: publisher.publish_year,
      });
    }

    await review.$add("books", newBook, { transaction: t });
    return {
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
    };
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
        const reviewFields = {
          body: review.body,
          byline: review.byline,
          featured: review.featured,
          published_at: review.publishedAt
            ? new Date(review.publishedAt)
            : null,
        };

        const newReview = await PgReview.create(reviewFields, {
          transaction: t,
        });

        const tagsRet = await this.findOrCreateTags(newReview, review.tags, t);

        const booksRet: BookResponse[] = [];
        for (let bIndex = 0; bIndex < review.books.length; bIndex += 1) {
          const book = review.books[bIndex];

          booksRet.push(await this.createBook(newReview, book, t));
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

  async updateReviews(id: string, entity: ReviewRequestDTO): Promise<void> {
    try {
      await this.db.transaction(async (t) => {
        const reviewToUpdate = await PgReview.findByPk(id, {
          transaction: t,
          include: [{ all: true, nested: true }],
        });

        if (!reviewToUpdate) {
          throw new Error(`Review id ${id} not found`);
        }

        Promise.all(
          entity.tags.map(async (tag: Tag) => {
            if (tag.id) {
              const tagToUpdate = await PgTag.findByPk(tag.id, {
                transaction: t,
              });
              if (!tagToUpdate) {
                throw new Error(`Tag id ${tag.id} not found`);
              }
              tagToUpdate.update({ name: tag.name });
            } else {
              await this.findOrCreateTag(reviewToUpdate, tag, t);
            }
          }),
        );

        Promise.all(
          entity.books.map(async (book: BookRequest) => {
            const { seriesId } = book;
            let series: PgSeries | null;
            if (seriesId !== undefined || seriesId !== null) {
              const seriesToUpdate = await PgSeries.findByPk(seriesId, {
                transaction: t,
              });
              if (!seriesToUpdate) {
                throw new Error(`Series id ${seriesId} not found`);
              }
              await seriesToUpdate.update({ name: book.seriesName });
              series = seriesToUpdate;
            } else {
              series = await this.findOrCreateSeries(book.seriesName, t);
            }

            const bookId = book.id;
            if (bookId !== undefined && bookId !== null) {
              const bookToUpdate = await PgBook.findByPk(bookId, {
                transaction: t,
              });

              if (!bookToUpdate) {
                throw new Error(`Book id ${bookId} not found`);
              }
              await bookToUpdate.update(
                {
                  review_id: id,
                  title_prefix: book.titlePrefix,
                  title: book.title,
                  series_id: series?.id,
                  series_order: book.seriesOrder,
                  coverImage: book.coverImage,
                  illustrator: book.illustrator,
                  formats: book.formats,
                  age_range: [book.minAge, book.maxAge],
                },
                { transaction: t },
              );

              for (let i = 0; i < book.authors.length; i += 1) {
                const author = book.authors[i];
                if (author.id) {
                  const authorToUpdate = await PgAuthor.findByPk(author.id, {
                    transaction: t,
                  });
                  if (!authorToUpdate) {
                    throw new Error(`Author id ${author.id} not found`);
                  }
                  authorToUpdate.update(
                    {
                      full_name: author.fullName,
                      display_name: author.displayName,
                      attribution: author.attribution,
                    },
                    { transaction: t },
                  );
                } else {
                  await this.findOrCreateAuthor(bookToUpdate, author, t);
                }
              }

              for (let i = 0; i < book.publishers.length; i += 1) {
                const publisher = book.publishers[i];
                if (publisher.id) {
                  const publisherToUpdate = await PgPublisher.findByPk(
                    publisher.id,
                    { transaction: t },
                  );
                  if (!publisherToUpdate) {
                    throw new Error(`Publisher id ${publisher.id} not found`);
                  }
                  publisherToUpdate.update(
                    {
                      full_name: publisher.fullName,
                      publish_year: publisher.publishYear,
                    },
                    { transaction: t },
                  );
                } else {
                  await this.findOrCreatePublisher(bookToUpdate, publisher, t);
                }
              }
            } else {
              this.createBook(reviewToUpdate, book, t);
            }
          }),
        );
      });
    } catch (error: unknown) {
      Logger.error(
        `Failed to update review. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default ReviewService;
