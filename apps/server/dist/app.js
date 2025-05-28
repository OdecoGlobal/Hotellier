"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const hotel_route_1 = __importDefault(require("./routes/hotel.route"));
const error_controller_1 = require("./controllers/error.controller");
const app = (0, express_1.default)();
// Logging in development
if (process.env.NODE_ENV === "development")
    app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.static(`${__dirname}/public`));
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/users", user_route_1.default);
app.use("/api/v1/hotels", hotel_route_1.default);
app.use(error_controller_1.errorHandler);
exports.default = app;
