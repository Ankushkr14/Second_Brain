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
exports.signup = exports.signin = void 0;
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const zod_1 = require("zod");
const httpStatus_1 = require("../config/httpStatus");
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = validationMiddleware_1.signinValidation.parse(req.body);
        const result = yield database_1.User.findOne({ email: user.email.toLowerCase() });
        if (!result) {
            return res.status(httpStatus_1.HttpStatus.WRONG_CREDENTIALS).json({
                success: false,
                message: "Email not registered"
            });
        }
        const isValid = yield bcrypt_1.default.compare(user.password, result.password);
        if (!isValid) {
            return res.status(httpStatus_1.HttpStatus.WRONG_CREDENTIALS).json({
                success: false,
                message: "Incorrect Password"
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: result._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        });
        res.status(httpStatus_1.HttpStatus.SUCCESS).json({
            success: true,
            message: "Signin Successfully",
            token: token
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(httpStatus_1.HttpStatus.INVALID_INPUT).json({
                success: false,
                message: "Input Invalid",
                error: error.errors
            });
        }
        res.status(httpStatus_1.HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});
exports.signin = signin;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = validationMiddleware_1.signupValidation.parse(req.body);
        const result = yield database_1.User.findOne({ email: user.email.toLowerCase() });
        if (result) {
            return res.status(httpStatus_1.HttpStatus.USER_EXISTS).json({
                success: false,
                message: "User already exists with this email address."
            });
        }
        const hashPassword = yield bcrypt_1.default.hash(user.password, 12);
        const newUser = yield database_1.User.create({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email.toLowerCase(),
            password: hashPassword
        });
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        });
        res.status(httpStatus_1.HttpStatus.SUCCESS).json({
            success: true,
            message: "User registered successfully.",
            token: token
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(httpStatus_1.HttpStatus.INVALID_INPUT).json({
                success: false,
                message: "Input error",
            });
        }
        res.status(httpStatus_1.HttpStatus.SERVER_ERROR).json({
            success: false,
            message: "Server error",
            error: error,
        });
    }
});
exports.signup = signup;
