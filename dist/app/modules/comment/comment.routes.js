"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const comment_validation_1 = require("./comment.validation");
const comment_controller_1 = require("./comment.controller");
const router = express_1.default.Router();
router.post("/add-comment", (0, validateRequest_1.default)(comment_validation_1.CommentValidation.createCommentZodSchema), comment_controller_1.CommentController.createComment);
router.post("/like/:commentId", (0, validateRequest_1.default)(comment_validation_1.CommentValidation.commentZodSchema), comment_controller_1.CommentController.likeComment);
router.post("/dislike/:commentId", (0, validateRequest_1.default)(comment_validation_1.CommentValidation.commentZodSchema), comment_controller_1.CommentController.dislikeComment);
router.patch("/update-comment/:commentId", (0, validateRequest_1.default)(comment_validation_1.CommentValidation.updateCommentZodSchema), comment_controller_1.CommentController.updateComment);
router.delete("/delete-comment/:commentId", comment_controller_1.CommentController.deleteComment);
router.get("/", comment_controller_1.CommentController.getComment);
exports.CommentRoutes = router;
