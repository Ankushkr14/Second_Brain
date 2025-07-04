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
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeSharedLink = exports.getSharedContent = exports.shareContent = exports.deleteContent = exports.getContentById = exports.getAllContent = exports.addContent = void 0;
const database_1 = require("../config/database");
const httpStatus_1 = require("../config/httpStatus");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const tagController_1 = require("./tagController");
const uuid_1 = require("uuid");
const addContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body.userId;
        const user = database_1.User.findById({ _id: id });
        if (!user) {
            return res.status(httpStatus_1.HttpStatus.USER_NOT_FOUND).json({
                success: false,
                message: "User not found"
            });
        }
        const content = validationMiddleware_1.contentValidation.parse(req.body);
        const tagId = yield (0, tagController_1.findOrCreateTag)(content.tags);
        if (tagId.length === 0) {
            return res.status(httpStatus_1.HttpStatus.INVALID_INPUT).json({
                success: false,
                message: "Tags are required"
            });
        }
        const result = yield database_1.Content.create({
            link: content.link,
            type: content.type,
            title: content.title,
            tags: tagId,
            userId: id
        });
        res.status(httpStatus_1.HttpStatus.SUCCESS).json({
            success: true,
            message: "Content added successfully",
            id: result._id
        });
    }
    catch (error) {
        res.status(httpStatus_1.HttpStatus.SERVER_ERROR).json({
            success: false,
            message: error
        });
    }
});
exports.addContent = addContent;
const getAllContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body.userId;
        const user = yield database_1.User.findById(id);
        if (!user) {
            return res.status(httpStatus_1.HttpStatus.USER_NOT_FOUND).json({
                success: false,
                message: "User not found"
            });
        }
        const contentData = yield database_1.Content.find({ userId: id }).populate("userId", "firstname lastname");
        if (!contentData) {
            return res.status(httpStatus_1.HttpStatus.CONTENT_NOT_FOUND).json({
                success: false,
                message: 'Content not found.'
            });
        }
        res.status(httpStatus_1.HttpStatus.SUCCESS).json({
            success: true,
            message: "Content fetched successfuly",
            total: contentData.length,
            content: contentData
        });
    }
    catch (error) {
        res.status(httpStatus_1.HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});
exports.getAllContent = getAllContent;
const getContentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body.userId;
        const contentId = req.params.id;
        const user = yield database_1.User.findById(id);
        if (!user) {
            return res.status(httpStatus_1.HttpStatus.USER_NOT_FOUND).json({
                success: false,
                message: "User not found"
            });
        }
        const contentData = yield database_1.Content.findById({ _id: contentId, userId: id }).populate("userId", "firstname lastname");
        if (!contentData) {
            return res.status(httpStatus_1.HttpStatus.CONTENT_NOT_FOUND).json({
                success: false,
                message: "Content not found for this user."
            });
        }
        res.status(httpStatus_1.HttpStatus.SUCCESS).json({
            success: true,
            message: "Content fetched successfully",
            Data: contentData
        });
    }
    catch (error) {
        res.status(httpStatus_1.HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.getContentById = getContentById;
const deleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body.userId;
        const contentId = req.params.id;
        const user = yield database_1.User.findById({ _id: id });
        if (!user) {
            return res.status(httpStatus_1.HttpStatus.USER_NOT_FOUND).json({
                success: false,
                message: "User not found",
            });
        }
        if (!contentId) {
            return res.status(httpStatus_1.HttpStatus.CONTENT_NOT_FOUND).json({
                success: false,
                message: "Content not found."
            });
        }
        const content = yield database_1.Content.findById({ _id: contentId });
        if (!content || !content.userId || content.userId.toString() !== id.toString()) {
            return res.status(httpStatus_1.HttpStatus.INVALID_ACCESS).json({
                success: false,
                message: 'Content not found'
            });
        }
        yield database_1.Content.findOneAndDelete({ _id: contentId, userId: id });
        res.status(httpStatus_1.HttpStatus.SUCCESS).json({
            success: true,
            message: "Content Delete successfully."
        });
    }
    catch (error) {
        res.status(httpStatus_1.HttpStatus.SERVER_ERROR).json({
            success: true,
            message: "Internal server error."
        });
    }
});
exports.deleteContent = deleteContent;
const shareContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const contentId = req.params.id;
        const { permission } = req.body;
        if (!userId || !contentId) {
            return res.status(httpStatus_1.HttpStatus.USER_NOT_FOUND).json({
                success: false,
                message: "User not found or Content not found"
            });
        }
        const shareableToken = (0, uuid_1.v4)();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        const newShareLink = yield database_1.Link.create({
            contentId: contentId,
            userId: userId.id,
            sharedToken: shareableToken,
            permission,
            expiresAt: expiresAt
        });
        res.status(httpStatus_1.HttpStatus.SUCCESS).json({
            success: true,
            message: "Shareable Link generated",
            shareableLink: `http://localhost:8080/user/share/${newShareLink.sharedToken}`
        });
    }
    catch (error) {
        res.status(httpStatus_1.HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});
exports.shareContent = shareContent;
const getSharedContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const token = req.params.linkId;
        if (!userId) {
            return res.status(httpStatus_1.HttpStatus.INVALID_ACCESS).json({
                success: false,
                message: "User need to be logged in."
            });
        }
        const shareLink = yield database_1.Link.findOne({ sharedToken: token });
        if (!shareLink) {
            return res.status(httpStatus_1.HttpStatus.CONTENT_NOT_FOUND).json({
                success: false,
                message: 'Invalid or expired shareable Link'
            });
        }
        const content = yield database_1.Content.findById({ _id: shareLink.contentId }).populate("userId", "firstname");
        if (!content) {
            return res.status(httpStatus_1.HttpStatus.CONTENT_NOT_FOUND).json({
                success: false,
                message: "Content Not Found",
            });
        }
        res.status(httpStatus_1.HttpStatus.SUCCESS).json({
            success: true,
            message: "Content fetched successfully",
            permission: shareLink.permission,
            content: content,
        });
    }
    catch (error) {
        res.status(httpStatus_1.HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});
exports.getSharedContent = getSharedContent;
const revokeSharedLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const token = req.params.linkId;
        if (!token) {
            return res.status(httpStatus_1.HttpStatus.INVALID_ACCESS).json({
                success: false,
                message: "shared Token is missing"
            });
        }
        const shareLink = yield database_1.Link.findOne({ sharedToken: token });
        if (!shareLink) {
            return res.status(httpStatus_1.HttpStatus.CONTENT_NOT_FOUND).json({
                success: false,
                message: "Shared link not found or already revoked"
            });
        }
        const content = yield database_1.Content.findById(shareLink.contentId);
        if (!content || !content.userId || content.userId.toString() !== userId.id.toString()) {
            return res.status(httpStatus_1.HttpStatus.INVALID_ACCESS).json({
                success: false,
                message: "Unauthorised to revoke this link"
            });
        }
        yield database_1.Link.deleteOne({ sharedToken: token });
        res.status(httpStatus_1.HttpStatus.SUCCESS).json({
            success: true,
            message: "Shareable link revoked successgfully"
        });
    }
    catch (error) {
        res.status(httpStatus_1.HttpStatus.SERVER_ERROR).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});
exports.revokeSharedLink = revokeSharedLink;
