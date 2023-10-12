import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import { IComment, ILike } from "./comment.interface";
import { Comment } from "./comment.model";

const createComment = async (payload: IComment): Promise<IComment> => {
  const result = await Comment.create(payload);
  return result;
};

const likeComment = async (payload: ILike): Promise<IComment | null> => {
  const { commentId, userId } = payload;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment not found.");
  }
  if (comment.dislikes.includes(userId)) {
    await Comment.findByIdAndUpdate(
      commentId,
      { $pull: { dislikes: userId } },
      { new: true }
    );
  }

  if (comment.likes.includes(userId)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You have already liked this comment."
    );
  }
  const result = await Comment.findByIdAndUpdate(
    commentId,
    { $addToSet: { likes: userId } },
    { new: true }
  );
  return result;
};

const dislikeComment = async (payload: ILike): Promise<IComment | null> => {
  const { commentId, userId } = payload;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment not found.");
  }
  if (comment.dislikes.includes(userId)) {
    await Comment.findByIdAndUpdate(
      commentId,
      { $pull: { likes: userId } },
      { new: true }
    );
  }

  if (comment.dislikes.includes(userId)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You have already disliked this comment."
    );
  }
  const result = await Comment.findByIdAndUpdate(
    commentId,
    { $addToSet: { dislikes: userId } },
    { new: true }
  );
  return result;
};

export const CommentServices = {
  createComment,
  likeComment,
  dislikeComment,
};
