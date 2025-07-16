"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const httpStatus_1 = require("./config/httpStatus");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://second-brain-eosin.vercel.app/'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
const port = process.env.PORT || 3000;
const DB = process.env.DB;
app.use('/', indexRoutes_1.default);
app.get('/health', (req, res) => {
    try {
        res.status(httpStatus_1.HttpStatus.SUCCESS).json({
            success: true,
            message: "Server Health Check OK - Second Brain API",
        });
    }
    catch (error) {
        res.status(httpStatus_1.HttpStatus.INVALID_ACCESS).json({
            success: false,
            message: "Server Health Check Failed - Second Brain API",
        });
    }
});
mongoose_1.default.connect(`${DB}`)
    .then(() => {
    console.log("DB is connected");
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
})
    .catch((error) => {
    console.log("DB error: ", error);
    process.exit(1);
});
