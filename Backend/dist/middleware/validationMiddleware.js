"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentValidation = exports.signinValidation = exports.signupValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupValidation = zod_1.default.object({
    firstname: zod_1.default.string().min(1),
    lastname: zod_1.default.string().min(1),
    email: zod_1.default.string().email('Invalid email address'),
    password: zod_1.default.string().min(8, "Password should have 8 characters."),
    confirmPassword: zod_1.default.string().min(8, "Password should have 8 characters.")
}).refine((data) => data.confirmPassword === data.password);
exports.signinValidation = zod_1.default.object({
    email: zod_1.default.string().email('Invalid email address'),
    password: zod_1.default.string().min(8, "Password should have 8 characters.")
});
exports.contentValidation = zod_1.default.object({
    type: zod_1.default.string(),
    link: zod_1.default.string(),
    title: zod_1.default.string().min(1, "Title is needed"),
    tags: zod_1.default.array(zod_1.default.string()).min(1, 'At least 1 tag is needed'),
});
