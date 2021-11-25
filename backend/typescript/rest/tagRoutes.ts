import { Router } from "express";
import sendResponseByMimeType from "../utilities/responseUtil";
import TagService from "../services/implementations/tagService";
import ITagService from "../services/interfaces/tagService";
import { getErrorMessage } from "../utilities/errorResponse";

const tagRouter: Router = Router();
const tagService: ITagService = new TagService();

tagRouter.get("/", async(req, res) => {
    const contentType = req.headers["content-type"];
    try {
        const tags = await tagService.getTags();
        await sendResponseByMimeType(
            res,
            200,
            contentType,
            tags,
        );
    } catch (e: unknown) {
        await sendResponseByMimeType(res, 500, contentType, [
            {
                error: getErrorMessage(e),
            }
        ]);
    }
});

export default tagRouter;