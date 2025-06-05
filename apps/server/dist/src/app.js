"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const hotel_route_1 = __importDefault(require("./routes/hotel.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const helmet_1 = __importDefault(require("helmet"));
// @ts-ignore
// import xss from 'xss-clean';
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const error_controller_1 = require("./controllers/error.controller");
const app = (0, express_1.default)();
// app.enable('trust proxy');
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.options(/.*/, (0, cors_1.default)());
app.use(express_1.default.static(`${__dirname}/public`));
app.use((0, helmet_1.default)());
// Logging in development
if (process.env.NODE_ENV === 'development')
    app.use((0, morgan_1.default)('dev'));
const limiter = (0, express_rate_limit_1.default)({
    limit: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request!!. Try again in an hour',
});
app.use('/api', limiter);
app.use(express_1.default.json({ limit: '10kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' }));
app.use((0, cookie_parser_1.default)());
// app.use(xss());
app.use((0, compression_1.default)());
app.use('/api/v1/auth', auth_route_1.default);
app.use('/api/v1/users', user_route_1.default);
app.use('/api/v1/hotels', hotel_route_1.default);
app.use(error_controller_1.errorHandler);
exports.default = app;
