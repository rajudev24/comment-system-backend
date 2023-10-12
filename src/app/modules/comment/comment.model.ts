import { Schema, model } from "mongoose";
import { CommentModel, IComment } from "./comment.interface";

export const CommentSchema = new Schema<IComment, CommentModel>(
  {
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Comment = model<IComment, CommentModel>("Comment", CommentSchema);
