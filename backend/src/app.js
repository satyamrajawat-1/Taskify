import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// ✅ CORS CONFIG FOR VERCEL → RENDER
app.use(
  cors({
    origin: "https://taskify-mu-opal.vercel.app", // ✅ YOUR VERCEL URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ SAFE OPTIONS FIX (NO CRASH)
app.options("/*", cors());

// ✅ MIDDLEWARES
app.use(cookieParser());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));

// ✅ ROUTES
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

// ✅ GLOBAL ERROR HANDLER
app.use(errorHandler);

export { app };
