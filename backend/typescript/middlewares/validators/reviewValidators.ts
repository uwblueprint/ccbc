import { Request, Response, NextFunction } from "express";
import { createCheckers } from "ts-interface-checker";
import IReviewTI from "../../services/interfaces/checkers/IReviewService-ti";
import { getErrorMessage } from "../../utilities/errorResponse";

const reviewRequestDtoValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { ReviewRequestDTO } = createCheckers(IReviewTI);
    ReviewRequestDTO.check(req.body);
  } catch (e: unknown) {
    return res.status(400).send(getErrorMessage(e));
  }

  return next();
};

export default reviewRequestDtoValidator;
