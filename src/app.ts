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
import router from "./routes";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(logger);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "DevPulse API Running Successfully",
  });
});

app.use("/api", router);

app.use(notFoundMiddlewares.notFound);

app.use(errorMiddlewares.globalErrorHandler);

export default app;
