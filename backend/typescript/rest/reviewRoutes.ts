import { Router } from "express";
import ReviewService from "../services/implementations/reviewService";
import {
  IReviewService,
  BookRequest,
  ReviewResponseDTO,
  PaginatedReviewResponseDTO,
} from "../services/interfaces/IReviewService";
import { getErrorMessage, sendErrorResponse } from "../utilities/errorResponse";
import sendResponseByMimeType from "../utilities/responseUtil";
import reviewRequestDtoValidator from "../middlewares/validators/reviewValidators";
import {
  getAccessToken,
  isAuthorizedByUserId,
  isAuthorizedByRole,
} from "../middlewares/auth";
import AuthService from "../services/implementations/authService";
import IAuthService from "../services/interfaces/authService";
import UserService from "../services/implementations/userService";

const reviewRouter: Router = Router();
const reviewService: IReviewService = new ReviewService();
const authService: IAuthService = new AuthService(new UserService());

reviewRouter.post(
  "/",
  isAuthorizedByRole(new Set(["Admin"])),
  isAuthorizedByUserId("createdBy"),
  reviewRequestDtoValidator,
  async (req, res) => {
    const contentType = req.headers["content-type"];
    try {
      const newReview = await reviewService.createReview({
        body: req.body.body,
        byline: req.body.byline,
        featured: req.body.featured,
        createdBy: req.body.createdBy,
        books: req.body.books as BookRequest[],
        publishedAt: req.body.publishedAt,
      });
      await sendResponseByMimeType<ReviewResponseDTO>(
        res,
        200,
        contentType,
        newReview,
      );
    } catch (e: unknown) {
      sendErrorResponse(e, res);
    }
  },
);

reviewRouter.get(
  "/:id",
  isAuthorizedByRole(new Set(["Admin", "Subscriber", "Author"])),
  async (req, res) => {
    const { id } = req.params;
    try {
      const review = await reviewService.getReview(id);
      if (review.publishedAt == null) {
        const accessToken = getAccessToken(req);
        const isAdmin =
          accessToken &&
          (await authService.isAuthorizedByRole(
            accessToken,
            new Set(["Admin"]),
          ));
        if (isAdmin) {
          res.status(200).json(review);
        } else {
          // this response should be identical to the one in reviewService,
          // otherwise the attacker can deduce that this is a draft id.
          sendErrorResponse(new Error(`Review id ${id} not found`), res);
        }
      } else {
        res.status(200).json(review);
      }
    } catch (e: unknown) {
      sendErrorResponse(e, res);
    }
  },
);

reviewRouter.get(
  "/",
  isAuthorizedByRole(new Set(["Admin", "Subscriber", "Author"])),
  async (req, res) => {
    const searchTerm = req.query.search;
    const contentType = req.headers["content-type"];
    const page: string = req.query.page as string;
    const size: string = req.query.size as string;
    const genres: string[] = (req.query.genres as string)
      ? (req.query.genres as string).split(",")
      : [];

    const { minAge, maxAge, featured } = req.query;

    try {
      const accessToken = getAccessToken(req);
      const isAdmin =
        accessToken &&
        (await authService.isAuthorizedByRole(accessToken, new Set(["Admin"])));
      let { draft } = req.query;
      if (!isAdmin) {
        draft = "false";
      }

      const reviewsData = await reviewService.getReviews(
        page,
        size,
        genres,
        parseInt(minAge as string, 10) ?? undefined,
        parseInt(maxAge as string, 10) ?? undefined,
        featured as string,
        searchTerm ? (searchTerm as string) : undefined,
        draft as string,
      );
      await sendResponseByMimeType<PaginatedReviewResponseDTO>(
        res,
        200,
        contentType,
        reviewsData,
      );
    } catch (e: unknown) {
      await sendResponseByMimeType(res, 500, contentType, [
        {
          error: getErrorMessage(e),
        },
      ]);
    }
  },
);

reviewRouter.put(
  "/:id",
  isAuthorizedByRole(new Set(["Admin"])),
  reviewRequestDtoValidator,
  async (req, res) => {
    try {
      const { id } = req.params;
      const review = await reviewService.updateReviews(id, req.body);
      res.status(200).json(review);
    } catch (e: unknown) {
      sendErrorResponse(e, res);
    }
  },
);

reviewRouter.delete(
  "/:id",
  isAuthorizedByRole(new Set(["Admin"])),
  async (req, res) => {
    const { id } = req.params;
    try {
      await reviewService.deleteReview(id);
      res.status(204).send();
    } catch (e: unknown) {
      sendErrorResponse(e, res);
    }
  },
);

export default reviewRouter;
