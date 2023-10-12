import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendresponse from "../../../shared/sendResonse";
import httpStatus from "http-status";
import { CommentServices } from "./comment.service";
import { ILike } from "./comment.interface";
import mongoose from "mongoose";

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
const getComment = catchAsync(async (req: Request, res: Response) => {});
export const CommentController = {
  createComment,
  likeComment,
  dislikeComment,
  getComment,
};