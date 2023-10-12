import express from "express";
import { AuthRoutes } from "../modules/user/auth.routes";
import { CommentRoutes } from "../modules/comment/comment.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/comment",
    route: CommentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
