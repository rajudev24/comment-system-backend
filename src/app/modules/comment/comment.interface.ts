import mongoose, { Document, Model } from "mongoose";

export interface IComment {
  text: string;
  author: mongoose.Schema.Types.ObjectId;
  likes: mongoose.Schema.Types.ObjectId[];
  dislikes: mongoose.Schema.Types.ObjectId[];
}

export interface ILike {
  userId: mongoose.Schema.Types.ObjectId;
  commentId: string;
}

export type CommentModel = Model<IComment, Record<string, unknown>>;
