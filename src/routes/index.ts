import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { issueRoutes } from "../modules/issues/issues.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes.router,
  },
  {
    path: "/issues",
    route: issueRoutes.router,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
