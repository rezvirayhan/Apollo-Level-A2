import { Router } from "express";
import { authControllers } from "./controller";

const router = Router();

router.post("/signup", authControllers.signup);

router.post("/login", authControllers.login);

export const authRoutes = {
  router,
};
