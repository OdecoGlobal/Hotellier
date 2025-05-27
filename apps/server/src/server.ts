// import { prisma } from "./db/primsa";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION 💣💣 Shutting down⚠️⚠️");
});

import app from "./app";

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});

process.on("unhandledRejection", (err: any) => {
  console.error("UNHANDLED REJECTION 💣 Shutting down...");
  console.error(err instanceof Error ? err.stack : err);
  server.close(() => {
    process.exit(1);
  });
});
