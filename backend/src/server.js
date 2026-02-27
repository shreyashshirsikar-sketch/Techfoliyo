const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// More permissive CORS for development
app.use(cors({
  origin: "http://localhost:5173", // Your frontend port (Vite default)
  credentials: true
}));

app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const projectRoutes = require("./routes/projectRoutes");
app.use("/projects", projectRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Techfoliyo API Running 🚀");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});