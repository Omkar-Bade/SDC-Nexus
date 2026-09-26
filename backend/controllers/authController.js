const db = require("../utils/db");

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password],
    );
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { userId: result.insertId },
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.json({
        success: false,
        message: "Username already exists",
      });
    } else {
      return res.json({
        success: false,
        message: "Database error",
      });
    }
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
    );

    if (rows.length > 0) {
      res.json({
        success: true,
        message: "Login successful",
        data: { user: { id: rows[0].id, username: rows[0].username } },
      });
    } else {
      res.json({
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Database error",
    });
  }
};

module.exports = {
  register,
  login,
};
