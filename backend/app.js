import "dotenv/config"
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js"
import workRoutes from "./routes/work.js"
import designRoutes from "./routes/design.js"
import uploadRoutes from "./routes/upload.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes)
app.use("/api/work", workRoutes)
app.use("/api/design", designRoutes)
app.use("/api/upload", uploadRoutes)

app.get("/", (req, res) => {
    res.json({status: 'Server is running'})
})

export default app;