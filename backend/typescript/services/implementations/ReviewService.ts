import { resolve } from "path";
import { Sequelize } from "sequelize-typescript";
import PgReview from "../../models/review.model";
import PgTag from "../../models/tag.model";
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
    const t = await this.db.transaction();
    let newReview: PgReview;
    let tag: PgTag;
    let tagCreated: boolean;

    try {
      newReview = await PgReview.create(
        {
          body: review.reviewBody,
          cover_images: review.reviewCoverImages,
          byline: review.reviewByline,
          featured: review.reviewFeatured,
          published_at: review.reviewPublishedAt,
        },
        { transaction: t },
      );

      [tag, tagCreated] = await PgTag.findOrCreate({
        where: { name: review.tagName },
        transaction: t,
      });

      newReview.tags.push(tag);

      await t.commit();
    } catch (error) {
      await t.rollback();
      Logger.error(`Failed to create entity. Reason = ${error.message}`);
      throw error;
    }

    return {
      ReviewId: newReview.id,
    };
  }
}

export default ReviewService;
