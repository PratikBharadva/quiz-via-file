const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello ji...");
});

// route import
const fileRoutes = require("./routes/fileRoutes");

// route config
app.use("/api", fileRoutes);

app.listen(PORT, () => {
  console.log(`Server started at PORT:${PORT}`);
});
