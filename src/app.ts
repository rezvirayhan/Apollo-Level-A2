import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import logger from "./middleware/logger";
// import { authRouter } from "./modules/auth/auth.router";

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
// app.use("/api/users", userRouter);

app.use(logger);

app.use(globalErrorHandler);

export default app;
