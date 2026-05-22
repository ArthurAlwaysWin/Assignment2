# Assignment 2

# Expense Tracker Web Application

## Project Summary

This project is a full-stack expense tracking web application. Users can register, log in, manage their own expense records, search and filter expenses in real time, and view spending summaries. Admin users can manage users and review user activity logs.

The project extends the original Assignment 1 expense tracker into a React frontend with a Spring Boot backend, JWT authentication, role-based access control, and MySQL persistence.

## Tech Stack

- Frontend: React, Vite, React Router, Axios
- Backend: Java 21, Spring Boot, Spring Security
- Authentication: JWT, BCrypt password hashing
- Database: MySQL
- Data Access: Spring Data JPA (Hibernate)
- Version Control: Git and GitHub

## Main Features

- User registration and login
- JWT-based authentication
- Role-based access control for normal users and admins
- Create, read, update, and delete expense records
- User-specific expense isolation
- Real-time expense search
- Date and category filtering
- Total expense summary and category-based summary
- Monthly expenditure trend grouped by `YYYY-MM`
- User activity logging for registration, login, and expense actions
- Admin panel with user management and activity log views
- Shared React layout, protected routes, navigation, loading state, and error boundary

## Main Entities

- `users` - stores registered users, email, hashed password, and role
- `expenses` - stores user expense records
- `user_activities` - stores activity logs such as login, register, create expense, update expense, and delete expense

## Folder Structure

- `frontend/` - React + Vite frontend application
  - `src/api/request.js` - Axios instance and JWT request interceptor
  - `src/context/AuthContext.jsx` - global authentication state
  - `src/components/` - shared layout, navbar, protected route, loading, and error boundary
  - `src/pages/` - page-level components for login, register, home, profile, expenses, and admin
  - `src/features/expense/` - expense form, list, item, search, filters, summary, and monthly trend
  - `src/features/admin/` - user management and activity log components
  - `src/styles/index.css` - global frontend styles
- `expense_tracker/` - Spring Boot backend application
  - `src/main/java/com/uts/expense_tracker/config/` - CORS, Spring Security, and JWT filter configuration
  - `src/main/java/com/uts/expense_tracker/controller/` - REST controllers
  - `src/main/java/com/uts/expense_tracker/entity/` - JPA entities
  - `src/main/java/com/uts/expense_tracker/repository/` - Spring Data repositories
  - `src/main/java/com/uts/expense_tracker/service/` - business logic services
  - `src/main/java/com/uts/expense_tracker/util/JwtUtil.java` - JWT helper methods
  - `src/main/resources/application.properties` - database and JWT configuration
- `database.sql` - database bootstrap script
- `README.md` - project documentation
- `WORKLOAD.md` - team workload statement and file ownership
- `DEMO_SCRIPT.md` - demo recording checklist and timeline

## How to Run

### 1. Prepare MySQL

Create the database:

```sql
CREATE DATABASE IF NOT EXISTS expenses_tracker;
```

The backend uses `spring.jpa.hibernate.ddl-auto=update`, so the JPA entities can create or update tables automatically when the backend starts.

### 2. Start the Backend

Open a terminal in `expense_tracker/`.

For PowerShell:

```powershell
$env:DB_USERNAME='root'
$env:DB_PASSWORD='root'
mvn spring-boot:run
```

If your MySQL password is different, replace `root` with your local password.

The backend runs at:

```text
http://localhost:8080
```

### 3. Start the Frontend

Open another terminal in `frontend/`.

```bash
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

## Demo Flow

1. Register a new user.
2. Log in with the new account.
3. Add several expense records.
4. Search expenses using the real-time search bar.
5. Filter by category or date range.
6. Edit and delete an expense.
7. Log in as an admin user.
8. Open the admin panel to view users and activity logs.

## Admin Account Note

If there is no admin account yet, register a normal account first, then update its role in MySQL:

```sql
USE expenses_tracker;
UPDATE users SET role = 'ADMIN' WHERE username = 'admin';
```

After updating the role, log out and log in again so the new JWT includes the `ADMIN` role.

## Current Notes

- Recommended environment: Java 21+, Node.js, MySQL 8+, modern browser.
