CREATE DATABASE IF NOT EXISTS expenses_tracker;

USE expenses_tracker;

CREATE TABLE IF NOT EXISTS expenses(
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	category VARCHAR(100) NOT NULL,
	amount DECIMAL(10, 2) NOT NULL,
	expense_date DATE NOT NULL,
	description TEXT
);