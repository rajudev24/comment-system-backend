"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentValidation = void 0;
const zod_1 = require("zod");
const createCommentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        text: zod_1.z.string({
            required_error: "Text is required",
        }),
        author: zod_1.z.string({
            required_error: "Author ID is required",
        }),
        likes: zod_1.z.string().optional(),
        dislikes: zod_1.z.string().optional(),
    }),
});
const updateCommentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        text: zod_1.z
            .string({
            required_error: "Text is required",
        })
            .optional(),
        author: zod_1.z
            .string({
            required_error: "Author ID is required",
        })
            .optional(),
        likes: zod_1.z.string().optional(),
        dislikes: zod_1.z.string().optional(),
    }),
});
const commentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "User ID is required",
        }),
    }),
});
exports.CommentValidation = {
    createCommentZodSchema,
    updateCommentZodSchema,
    commentZodSchema,
};
