import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import * as firebaseAdmin from "firebase-admin";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import sequelize from "./models";
import authRouter from "./rest/authRoutes";
import entityRouter from "./rest/entityRoutes";
import reviewRouter from "./rest/reviewRoutes";
import userRouter from "./rest/userRoutes";
import tagRouter from "./rest/tagRoutes";

const clientHost = new RegExp(
  "https://ccbc-95e66(--([A-Za-z0-9-])+-[A-Za-z0-9]+)?.web.app",
);

const CORS_ALLOW_LIST = ["http://localhost:3000", clientHost];

if (process.env.CLIENT_URL) {
  CORS_ALLOW_LIST.push(process.env.CLIENT_URL);
}

const CORS_OPTIONS: cors.CorsOptions = {
  origin: CORS_ALLOW_LIST,
  credentials: true,
};

const swaggerDocument = YAML.load("swagger.yml");

const app = express();
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/entities", entityRouter);
app.use("/reviews", reviewRouter);
app.use("/users", userRouter);
app.use("/tags", tagRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const eraseDatabaseOnSync = false;
sequelize.sync({ force: eraseDatabaseOnSync });

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
});

const PORT = process.env.PORT || 5000;
app.listen({ port: PORT }, () => {
  /* eslint-disable-next-line no-console */
  console.info(`Server is listening on port ${PORT}!`);
});
