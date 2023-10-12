import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import { UserValidation } from "./auth.validation";
import { UserController } from "./auth.controller";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.post(
  "/login",
  validateRequest(UserValidation.loginUserZodSchema),
  UserController.loginUser
);

router.post(
  "/refresh-token",
  validateRequest(UserValidation.refreshTokenZodSchema),
  UserController.refreshToken
);

export const AuthRoutes = router;
