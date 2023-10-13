import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendresponse from "../../../shared/sendResonse";
import httpStatus from "http-status";
import { CommentServices } from "./comment.service";
import { IComment, ILike } from "./comment.interface";
import mongoose from "mongoose";
import pick from "../../../shared/pick";
import { paginationFields } from "../../constants/ppagination";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await CommentServices.createComment(data);

  sendresponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment added successfully",
    data: result,
  });
});

const likeComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { userId } = req.body;
  const data: ILike = {
    userId,
    commentId,
  };
  const result = await CommentServices.likeComment(data);
  sendresponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Like added successfully",
    data: result,
  });
});

const dislikeComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { userId } = req.body;
  const data: ILike = {
    userId,
    commentId,
  };
  const result = await CommentServices.dislikeComment(data);
  sendresponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dislike added successfully",
    data: result,
  });
});
const getComment = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await CommentServices.getComment(paginationOptions);
  sendresponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment retrive successfully",
    data: result,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.commentId;
  const updatedData = req.body;
  const result = await CommentServices.updateSingleCommenet(id, updatedData);
  sendresponse<IComment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment updated successfully",
    data: result,
  });
});
const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.commentId;
  const result = await CommentServices.deleteComment(id);
  sendresponse<IComment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment deleted successfully",
    data: result,
  });
});
export const CommentController = {
  createComment,
  likeComment,
  dislikeComment,
  getComment,
  updateComment,
  deleteComment,
};
