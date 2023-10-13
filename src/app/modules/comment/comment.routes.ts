import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CommentValidation } from "./comment.validation";
import { CommentController } from "./comment.controller";
const router = express.Router();

router.post(
  "/add-comment",
  validateRequest(CommentValidation.createCommentZodSchema),
  CommentController.createComment
);

router.post(
  "/like/:commentId",
  validateRequest(CommentValidation.commentZodSchema),
  CommentController.likeComment
);

router.post(
  "/dislike/:commentId",
  validateRequest(CommentValidation.commentZodSchema),
  CommentController.dislikeComment
);

router.patch(
  "/update-comment/:commentId",
  validateRequest(CommentValidation.updateCommentZodSchema),
  CommentController.updateComment
);
router.delete("/delete-comment/:commentId", CommentController.deleteComment);

router.get("/", CommentController.getComment);

export const CommentRoutes = router;
