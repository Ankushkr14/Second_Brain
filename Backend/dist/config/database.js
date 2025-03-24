"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.Content = exports.Tag = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contentTypes = ['image', 'video', 'article', 'audio'];
const userSchema = new mongoose_1.default.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 }
});
const contentSchema = new mongoose_1.default.Schema({
    link: { type: String },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true }
});
const tagSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, unique: true }
});
const permissionType = ['read', 'edit', 'none'];
const linkSchema = new mongoose_1.default.Schema({
    contentId: { type: mongoose_1.default.Types.ObjectId, ref: "Content", required: true },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User", required: true },
    sharedToken: { type: String, uniquie: true, required: true },
    permission: { type: String, enum: permissionType, default: 'read' },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
});
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
const Tag = mongoose_1.default.model('Tag', tagSchema);
exports.Tag = Tag;
const Content = mongoose_1.default.model('Content', contentSchema);
exports.Content = Content;
const Link = mongoose_1.default.model('Link', linkSchema);
exports.Link = Link;
