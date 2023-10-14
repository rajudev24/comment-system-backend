"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.CommentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CommentSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Comment = (0, mongoose_1.model)("Comment", exports.CommentSchema);
