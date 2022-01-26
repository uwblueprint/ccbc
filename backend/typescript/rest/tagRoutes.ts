import { Router } from "express";
import sendResponseByMimeType from "../utilities/responseUtil";
import TagService from "../services/implementations/tagService";
import { ITagService } from "../services/interfaces/ITagService";
import { getErrorMessage, sendErrorResponse } from "../utilities/errorResponse";

const tagRouter: Router = Router();
const tagService: ITagService = new TagService();

tagRouter.get("/", async (req, res) => {
  const contentType = req.headers["content-type"];
  try {
    const tags = await tagService.getTags();
    await sendResponseByMimeType(res, 200, contentType, tags);
  } catch (e: unknown) {
    await sendResponseByMimeType(res, 500, contentType, [
      {
        error: getErrorMessage(e),
      },
    ]);
  }
});

tagRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await tagService.deleteTag(id);
    res.status(204).send();
  } catch (e: unknown) {
    sendErrorResponse(e, res);
  }
});

export default tagRouter;
