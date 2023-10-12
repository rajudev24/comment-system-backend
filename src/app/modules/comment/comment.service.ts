import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import { IComment, ILike } from "./comment.interface";
import { Comment } from "./comment.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import calculatePagination from "../../../helpers/paginationHelper";
import { SortOrder } from "mongoose";

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

const getComment = async (paginationOptions: IPaginationOptions) => {
  const andConditions: any = [];
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Comment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Comment.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const CommentServices = {
  createComment,
  likeComment,
  dislikeComment,
  getComment,
};
