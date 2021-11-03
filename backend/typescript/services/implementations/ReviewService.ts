import { resolve } from "path";
import sequelize from "sequelize";
import { Sequelize } from "sequelize-typescript";
import PgReview from "../../models/review.model";
import PgTag from "../../models/tag.model";
import PgReviewTag from "../../models/review_tag.model";
import logger from "../../utilities/logger";
import {
  ReviewRequestDTO,
  IReviewService,
  ReviewResponseDTO,
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
  async createEntity(review: ReviewRequestDTO): Promise<ReviewResponseDTO> {
    let newReview: PgReview;
    let tag: PgTag;
    let tagCreated: boolean;
    let result;

    try {
      result = await this.db.transaction(async (t) => {
        newReview = await PgReview.create(
          {
            body: review.body,
            cover_images: review.coverImages,
            byline: review.byline,
            featured: review.featured,
            published_at: review.publishedAt,
          },
          { transaction: t },
        );

        await Promise.all(
          review.tags.map(async (reviewTag) => {
            [tag, tagCreated] = await PgTag.findOrCreate({
              where: { name: reviewTag.name },
              transaction: t,
            });

            await newReview.$add("tags", tag, { transaction: t });
          }),
        );

        return newReview;
      });
    } catch (error) {
      Logger.error(`Failed to create entity. Reason = ${error.message}`);
      throw error;
    }

    return {
      reviewId: result.id,
    };
  }
}

export default ReviewService;
