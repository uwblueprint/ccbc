import { Router } from "express";
import fs from "fs";
import multer from "multer";
import { isAuthorizedByRole } from "../middlewares/auth";
import entityRequestDtoValidator from "../middlewares/validators/entityValidators";
import EntityService from "../services/implementations/entityService";
import FileStorageService from "../services/implementations/fileStorageService";
import IFileStorageService from "../services/interfaces/fileStorageService";
import {
  EntityResponseDTO,
  IEntityService,
} from "../services/interfaces/IEntityService";
import { getErrorMessage, sendErrorResponse } from "../utilities/errorResponse";
import sendResponseByMimeType from "../utilities/responseUtil";

const upload = multer({ dest: "uploads/" });

const entityRouter: Router = Router();
entityRouter.use(isAuthorizedByRole(new Set(["User", "Admin"])));

const defaultBucket = process.env.DEFAULT_BUCKET || "";
const fileStorageService: IFileStorageService = new FileStorageService(
  defaultBucket,
);
const entityService: IEntityService = new EntityService(fileStorageService);

/* Create entity */
entityRouter.post(
  "/",
  upload.single("file"),
  entityRequestDtoValidator,
  async (req, res) => {
    try {
      const body = JSON.parse(req.body.body);
      const newEntity = await entityService.createEntity({
        stringField: body.stringField,
        intField: body.intField,
        enumField: body.enumField,
        stringArrayField: body.stringArrayField,
        boolField: body.boolField,
        filePath: req.file?.path,
        fileContentType: req.file?.mimetype,
      });
      if (req.file?.path) {
        fs.unlinkSync(req.file.path);
      }
      res.status(201).json(newEntity);
    } catch (e: unknown) {
      sendErrorResponse(e, res);
    }
  },
);

/* Get all entities */
entityRouter.get("/", async (req, res) => {
  const contentType = req.headers["content-type"];
  try {
    const entities = await entityService.getEntities();
    await sendResponseByMimeType<EntityResponseDTO>(
      res,
      200,
      contentType,
      entities,
    );
  } catch (e: unknown) {
    await sendResponseByMimeType(res, 500, contentType, [
      {
        error: getErrorMessage(e),
      },
    ]);
  }
});

/* Get entity by id */
entityRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const entity = await entityService.getEntity(id);
    res.status(200).json(entity);
  } catch (e: unknown) {
    sendErrorResponse(e, res);
  }
});

/* Update entity by id */
entityRouter.put(
  "/:id",
  upload.single("file"),
  entityRequestDtoValidator,
  async (req, res) => {
    const { id } = req.params;
    try {
      const body = JSON.parse(req.body.body);
      const entity = await entityService.updateEntity(id, {
        stringField: body.stringField,
        intField: body.intField,
        enumField: body.enumField,
        stringArrayField: body.stringArrayField,
        boolField: body.boolField,
        filePath: req.file?.path,
        fileContentType: req.file?.mimetype,
      });
      if (req.file?.path) {
        fs.unlinkSync(req.file.path);
      }
      res.status(200).json(entity);
    } catch (e: unknown) {
      sendErrorResponse(e, res);
    }
  },
);

/* Delete entity by id */
entityRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await entityService.deleteEntity(id);
    res.status(204).send();
  } catch (e: unknown) {
    sendErrorResponse(e, res);
  }
});

/* Get file associated with entity by fileUUID */
entityRouter.get("/files/:fileUUID", async (req, res) => {
  const { fileUUID } = req.params;
  try {
    const fileURL = await fileStorageService.getFile(fileUUID);
    res.status(200).json({ fileURL });
  } catch (e: unknown) {
    sendErrorResponse(e, res);
  }
});

export default entityRouter;
