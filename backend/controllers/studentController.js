const db = require("../utils/db");

const getStudents = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM students");
    res.json({
      success: true,
      message: "Students retrieved successfully",
      data: rows,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Database error",
    });
  }
};

const addStudent = async (req, res) => {
  const { name, email, department } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO students (name, email, department) VALUES (?, ?, ?)",
      [name, email, department],
    );
    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: { id: result.insertId },
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Database error",
    });
  }
};

module.exports = {
  getStudents,
  addStudent,
};
