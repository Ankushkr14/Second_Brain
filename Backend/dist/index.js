"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT;
const DB = process.env.DB;
app.use('/', indexRoutes_1.default);
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
