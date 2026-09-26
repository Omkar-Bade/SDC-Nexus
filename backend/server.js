const express = require("express");
const cors = require("cors");

// Import controllers
const { register, login } = require("./controllers/authController");
const { getStudents, addStudent } = require("./controllers/studentController");
// const { getCourses, addCourse } = require("./controllers/courseController");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import and use our custom middleware
const requestLogger = require("./middlewares/logger");
app.use(requestLogger);

// Basic route to check if API is working
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

// --- User Routes (Login / Register) ---
app.post("/api/register", register);
app.post("/api/login", login);

// --- Student Routes ---
app.get("/api/students", getStudents);
app.post("/api/students", addStudent);

// --- Course Routes ---
// app.get("/api/courses", getCourses);
// app.post("/api/courses", addCourse);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
