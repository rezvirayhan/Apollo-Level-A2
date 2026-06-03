import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { errorMiddlewares } from "./middleware/error.middleware";
import logger from "./middleware/logger";
import { notFoundMiddlewares } from "./middleware/notFound.middleware";
import { authRoutes } from "./modules/auth/routes";
import { issueRoutes } from "./modules/issues/routes";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!", author: "Next Level AI" });
});

app.use(logger);
app.use("/api/auth", authRoutes.router);
app.use("/api/issues", issueRoutes.router);

app.use(notFoundMiddlewares.notFound);

app.use(errorMiddlewares.globalErrorHandler);

export default app;
