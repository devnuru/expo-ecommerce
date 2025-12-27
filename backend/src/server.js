import express from "express";
import path from "path";
import { ENV } from "./config/env.js";

const app = express();

app.use(express.json());

const __dirname = path.resolve();

app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the Expo E-commerce Backend???!" });
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}

app.listen(ENV.PORT, () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);
});
