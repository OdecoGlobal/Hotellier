"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { prisma } from "./db/primsa";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("UNCAUGHT EXCEPTION 💣💣 Shutting down⚠️⚠️");
});
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 8080;
const server = app_1.default.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
});
process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION 💣 Shutting down...");
    console.error(err instanceof Error ? err.stack : err);
    server.close(() => {
        process.exit(1);
    });
});
