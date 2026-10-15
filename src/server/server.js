import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPool, handleLogin, handleSignup } from "./auth.js";

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), ".env") });

const app = express();

app.use(cors({
  origin: /^http:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AttireStore backend is running!");
});

app.post("/api/signup", handleSignup);
app.post("/api/login", handleLogin);

async function startServer() {
  try {
    await getPool().query("SELECT 1");
    console.log("MySQL connected successfully!");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  } catch (error) {
    console.error("Could not connect to MySQL:", error.message);
    process.exitCode = 1;
  }
}

startServer();