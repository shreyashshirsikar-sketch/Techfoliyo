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
const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/userRoutes"); // Make sure this file exists

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/users", userRoutes); // Add this line for user routes

// test route
app.get("/", (req, res) => {
  res.send("Techfoliyo API Running 🚀");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});