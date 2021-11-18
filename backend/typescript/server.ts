import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import * as firebaseAdmin from "firebase-admin";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import sequelize from "./models";
import Review from "./models/review.model";
import authRouter from "./rest/authRoutes";
import entityRouter from "./rest/entityRoutes";
import reviewRouter from "./rest/reviewRoutes";
import userRouter from "./rest/userRoutes";
import ReviewService from "./services/implementations/ReviewService";

const clientHost = new RegExp(
  "https://ccbc-95e66(--([A-Za-z0-9-])+-[A-Za-z0-9]+)?.web.app",
);
const CORS_ALLOW_LIST = ["http://localhost:3000", clientHost];

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

// TODO: this is for testing only
const reviewService = new ReviewService();
console.log(reviewService.getReview("1"));

// reviewService.createReview(
//   {
//       body: "review1",
//       coverImages: ["cover1"],
//       byline: "byline1",
//       featured: true,
//       publishedAt: 12445,
//       books: [
//         {
//           title: "title1",
//           titlePrefix: "titlePrefix1",
//           seriesOrder: "1",
//           illustrator: ["illustrator1"],
//           translator: ["translator1"],
//           formats: [
//             {
//               format: "format1",
//               price: "$15.0",
//               isbn: "1234-5678-931",
//             },
//           ],
//           minAge: 3,
//           maxAge: 18,
//           authors: [{ fullName: "author1" }],
//           publishers: [
//             {
//               fullName: "publisher",
//               publishYear: 2002,
//             },
//           ],
//           seriesName: "seriesName",
//         },
//       ],
//       tags: [{ name: "tag1" }],
//       createdBy: 1,
//     }
// );
