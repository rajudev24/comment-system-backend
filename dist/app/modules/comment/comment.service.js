"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const comment_model_1 = require("./comment.model");
const paginationHelper_1 = __importDefault(require("../../../helpers/paginationHelper"));
const createComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.Comment.create(payload);
    return result;
});
const likeComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId, userId } = payload;
    const comment = yield comment_model_1.Comment.findById(commentId);
    if (!comment) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Comment not found.");
    }
    if (comment.dislikes.includes(userId)) {
        yield comment_model_1.Comment.findByIdAndUpdate(commentId, { $pull: { dislikes: userId } }, { new: true });
    }
    if (comment.likes.includes(userId)) {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, "You have already liked this comment.");
    }
    const result = yield comment_model_1.Comment.findByIdAndUpdate(commentId, { $addToSet: { likes: userId } }, { new: true });
    return result;
});
const dislikeComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId, userId } = payload;
    const comment = yield comment_model_1.Comment.findById(commentId);
    if (!comment) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Comment not found.");
    }
    if (comment.dislikes.includes(userId)) {
        yield comment_model_1.Comment.findByIdAndUpdate(commentId, { $pull: { likes: userId } }, { new: true });
    }
    if (comment.dislikes.includes(userId)) {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, "You have already disliked this comment.");
    }
    const result = yield comment_model_1.Comment.findByIdAndUpdate(commentId, { $addToSet: { dislikes: userId } }, { new: true });
    return result;
});
const getComment = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const andConditions = [];
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.default)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield comment_model_1.Comment.find(whereConditions)
        .populate("author")
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield comment_model_1.Comment.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateSingleCommenet = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.Comment.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteComment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.Comment.findByIdAndDelete(id);
    return result;
});
exports.CommentServices = {
    createComment,
    likeComment,
    dislikeComment,
    getComment,
    updateSingleCommenet,
    deleteComment,
};
