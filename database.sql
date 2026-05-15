CREATE DATABASE IF NOT EXISTS expenses_tracker;

USE expenses_tracker;
DROP TABLE IF EXISTS expenses; 

CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,  -- must connect user
    title VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    expense_date DATE NOT NULL,
    description TEXT
);