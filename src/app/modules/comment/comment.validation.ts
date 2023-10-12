import { z } from "zod";

const createCommentZodSchema = z.object({
  body: z.object({
    text: z.string({
      required_error: "Text is required",
    }),
    author: z.string({
      required_error: "Author ID is required",
    }),
    likes: z.string().optional(),
    dislikes: z.string().optional(),
  }),
});
const updateCommentZodSchema = z.object({
  body: z.object({
    text: z
      .string({
        required_error: "Text is required",
      })
      .optional(),
    author: z
      .string({
        required_error: "Author ID is required",
      })
      .optional(),
    likes: z.string().optional(),
    dislikes: z.string().optional(),
  }),
});

const commentZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "User ID is required",
    }),
  }),
});

export const CommentValidation = {
  createCommentZodSchema,
  updateCommentZodSchema,
  commentZodSchema,
};
