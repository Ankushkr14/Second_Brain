"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const authRoute = express_1.default.Router();
authRoute.post('/signin', authController_1.signin);
authRoute.post('/signup', authController_1.signup);
exports.default = authRoute;
