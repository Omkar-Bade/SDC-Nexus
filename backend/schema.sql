
CREATE DATABASE IF NOT EXISTS student_management;

USE student_management;

SET SQL_SAFE_UPDATES = 0;

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- STUDENTS TABLE
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL
);

-- INSERTING INTO USERS
INSERT INTO users (username, password) VALUES
('Rahul', 'rahul123'),
('Amit', 'amit123'),
('Priya', 'priya123'),
('Sneha', 'sneha123'),
('Akash', 'akash123');

-- INSERTING INTO STUDENTS
INSERT INTO students (name, email, department) VALUES
('Rahul Patil', 'rahul@gmail.com', 'Computer Science'),
('Amit Sharma', 'amit@gmail.com', 'Electrical Engineering'),
('Priya Deshmukh', 'priya@gmail.com', 'Mechanical Engineering'),
('Sneha Kulkarni', 'sneha@gmail.com', 'Computer Science'),
('Akash Jadhav', 'akash@gmail.com', 'Electronics Engineering');

