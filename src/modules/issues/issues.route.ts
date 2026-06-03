import { Router } from "express";

import { authMiddlewares } from "../../middleware/auth.middleware";
import { roleMiddlewares } from "../../middleware/role.middleware";
import { issueControllers } from "./issues.controller";

const router = Router();

router.get("/", issueControllers.getAll);
router.get("/:id", issueControllers.getById);

router.post(
  "/",
  authMiddlewares.auth,
  roleMiddlewares.authorize("contributor", "maintainer"),
  issueControllers.create,
);

router.patch(
  "/:id",
  authMiddlewares.auth,
  roleMiddlewares.authorize( "maintainer"),
  issueControllers.update,
);

router.delete(
  "/:id",
  authMiddlewares.auth,
  roleMiddlewares.authorize("maintainer"),
  issueControllers.remove,
);

export const issueRoutes = {
  router,
};
