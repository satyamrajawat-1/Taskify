import dotenv from "dotenv";
import { app } from "./app.js";
import connect from "./db/index.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

connect()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("✅ Taskify Backend is Live!");
    });

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("❌ Database connection failed:", error);
  });
