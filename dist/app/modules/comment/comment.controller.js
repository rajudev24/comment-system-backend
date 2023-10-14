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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResonse_1 = __importDefault(require("../../../shared/sendResonse"));
const http_status_1 = __importDefault(require("http-status"));
const comment_service_1 = require("./comment.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const ppagination_1 = require("../../constants/ppagination");
const createComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = __rest(req.body, []);
    const result = yield comment_service_1.CommentServices.createComment(data);
    (0, sendResonse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Comment added successfully",
        data: result,
    });
}));
const likeComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const { userId } = req.body;
    const data = {
        userId,
        commentId,
    };
    const result = yield comment_service_1.CommentServices.likeComment(data);
    (0, sendResonse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Like added successfully",
        data: result,
    });
}));
const dislikeComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const { userId } = req.body;
    const data = {
        userId,
        commentId,
    };
    const result = yield comment_service_1.CommentServices.dislikeComment(data);
    (0, sendResonse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Dislike added successfully",
        data: result,
    });
}));
const getComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, ppagination_1.paginationFields);
    const result = yield comment_service_1.CommentServices.getComment(paginationOptions);
    (0, sendResonse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Comment retrive successfully",
        data: result,
    });
}));
const updateComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.commentId;
    const updatedData = req.body;
    const result = yield comment_service_1.CommentServices.updateSingleCommenet(id, updatedData);
    (0, sendResonse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Comment updated successfully",
        data: result,
    });
}));
const deleteComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.commentId;
    const result = yield comment_service_1.CommentServices.deleteComment(id);
    (0, sendResonse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Comment deleted successfully",
        data: result,
    });
}));
exports.CommentController = {
    createComment,
    likeComment,
    dislikeComment,
    getComment,
    updateComment,
    deleteComment,
};
