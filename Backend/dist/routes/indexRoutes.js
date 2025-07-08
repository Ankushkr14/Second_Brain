"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("./authRoute"));
const userRoute_1 = __importDefault(require("./userRoute"));
const middlleware_1 = require("../middleware/middlleware");
const userController_1 = require("../controller/userController");
const indexRoute = express_1.default.Router();
indexRoute.use('/auth', authRoute_1.default);
indexRoute.use('/user', middlleware_1.AuthMiddleware, userRoute_1.default);
indexRoute.get('/brain/:userId', userController_1.getPublicBrain);
exports.default = indexRoute;
