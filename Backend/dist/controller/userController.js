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
exports.getBrainSettings = exports.getPublicBrain = exports.toggleBrainPublic = exports.revokeSharedLink = exports.getSharedContent = exports.shareContent = exports.deleteContent = exports.getContentById = exports.getAllContent = exports.addContent = void 0;
const database_1 = require("../config/database");
const httpStatus_1 = require("../config/httpStatus");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const tagController_1 = require("./tagController");
const uuid_1 = require("uuid");
//1. Add Content
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
//2. Get All Content
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
        const contentData = yield database_1.Content.find({ userId: id })
            .populate("userId", "firstname lastname")
            .populate("tags", "title");
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
            content: contentData,
            isPublic: user.isPublicBrain,
            brainName: user.publicBrainName
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
//3. Get Content by ID
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
        const contentData = yield database_1.Content.findById({ _id: contentId, userId: id })
            .populate("userId", "firstname lastname")
            .populate("tags", "title");
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
//4. Delete Content
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
//5. Share Content
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
            shareableLink: `https://second-brain-xi-three.vercel.app/user/share/${newShareLink.sharedToken}`
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
//6. Get Shared Content
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
        const content = yield database_1.Content.findById({ _id: shareLink.contentId })
            .populate("userId", "firstname")
            .populate("tags", "title");
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
//7. Revoke Shared Link
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
//8. Toggle Brain Public/Private
const toggleBrainPublic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body.userId;
        const { isPublic } = req.body;
        if (!id) {
            return res.status(httpStatus_1.HttpStatus.INVALID_INPUT).json({
                success: false,
                message: "No UserId found"
            });
        }
        if (isPublic === undefined) {
            return res.status(httpStatus_1.HttpStatus.INVALID_INPUT).json({
                success: false,
                message: "isPublic field is required"
            });
        }
        const user = yield database_1.User.findById(id);
        if (!user) {
            return res.status(httpStatus_1.HttpStatus.USER_NOT_FOUND).json({
                success: false,
                message: "User not found"
            });
        }
        const updateUser = yield database_1.User.findByIdAndUpdate(id, {
            isPublicBrain: isPublic,
            publicBrainName: `${user.firstname}'s Brain`
        }, { new: true });
        if (!updateUser) {
            return res.status(httpStatus_1.HttpStatus.USER_NOT_FOUND).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(httpStatus_1.HttpStatus.SUCCESS).json({
            success: true,
            message: isPublic ? "Brain is now public" : "Brain is now private",
            isPublic: updateUser.isPublicBrain,
            brainName: updateUser.publicBrainName,
            shareableLink: isPublic ? `https://second-brain-eosin.vercel.app/brain/${id}` : null
        });
    }
    catch (error) {
        res.status(httpStatus_1.HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.toggleBrainPublic = toggleBrainPublic;
//9. Get Public Brain
const getPublicBrain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brainUserId = req.params.userId;
        const user = yield database_1.User.findById(brainUserId);
        if (!user || !user.isPublicBrain) {
            return res.status(httpStatus_1.HttpStatus.CONTENT_NOT_FOUND).json({
                success: false,
                message: "Public brain is not accessible"
            });
        }
        const contentData = yield database_1.Content.find({ userId: brainUserId })
            .populate("userId", "firstname lastname")
            .populate("tags", "title");
        if (!contentData || contentData.length === 0) {
            return res.status(httpStatus_1.HttpStatus.CONTENT_NOT_FOUND).json({
                success: true,
                message: "No content found in this public brain",
                content: []
            });
        }
        res.status(httpStatus_1.HttpStatus.SUCCESS).json({
            success: true,
            message: "Public brain content is fetched successfully",
            brainOwner: {
                name: user.publicBrainName,
            },
            content: contentData,
            total: contentData.length
        });
    }
    catch (error) {
        res.status(httpStatus_1.HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.getPublicBrain = getPublicBrain;
//10. Get Brain Settings
const getBrainSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body.userId;
        const user = yield database_1.User.findById(id);
        if (!user) {
            return res.status(httpStatus_1.HttpStatus.USER_NOT_FOUND).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(httpStatus_1.HttpStatus.SUCCESS).json({
            success: true,
            message: "Brain settings fetched successfully",
            settings: {
                isPublic: user.isPublicBrain || false,
                brainName: user.publicBrainName || `${user.firstname}'s Brain`,
                shareableLink: user.isPublicBrain ? `https://second-brain-eosin.vercel.app/brain/${id}` : null
            }
        });
    }
    catch (error) {
        res.status(httpStatus_1.HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});
exports.getBrainSettings = getBrainSettings;
