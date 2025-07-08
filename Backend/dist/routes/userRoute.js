"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const userRoute = express_1.default.Router();
userRoute.get('/user', () => {
});
userRoute.post('/content', userController_1.addContent);
userRoute.get('/content', userController_1.getAllContent);
userRoute.get('/content/:id', userController_1.getContentById);
userRoute.delete('/content/:id', userController_1.deleteContent);
userRoute.put('/brain/toggle', userController_1.toggleBrainPublic);
userRoute.get('/brain/settings', userController_1.getBrainSettings);
userRoute.post('/content/:id/share', userController_1.shareContent);
userRoute.get('/share/:linkId', userController_1.getSharedContent);
userRoute.delete('/share/:linkId', userController_1.revokeSharedLink);
exports.default = userRoute;
