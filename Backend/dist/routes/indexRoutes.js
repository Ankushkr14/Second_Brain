"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("./authRoute"));
const userRoute_1 = __importDefault(require("./userRoute"));
const middlleware_1 = require("../middleware/middlleware");
const indexRoute = express_1.default.Router();
indexRoute.use('/auth', authRoute_1.default);
indexRoute.use('/user', middlleware_1.AuthMiddleware, userRoute_1.default);
exports.default = indexRoute;
