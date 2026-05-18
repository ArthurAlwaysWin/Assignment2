# Assignment 2

# Expense Tracker Web Application

## Project Summary

This project helps users record daily expenses with title, category, amount, date, and description, then view and manage those records through a clean interface.

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Java (Spring Boot)
- Database: MySQL
- Data Access: Spring Data JPA (Hibernate)

## Features

- Single-page Application
- Create new expense records
- Read and display all expenses
- Update existing expenses
- Delete expenses
- Real-time total expense summary
- Category-based summary
- Date range filter for expense records
- Category filter for expense records
- Monthly expenditure trend (grouped by `YYYY-MM`)
- Basic error handling for API/network failures

## Folder Structure

- `index.html` - Main single-page UI
- `style.css` - Styling for layout and components
- `app.js` - Frontend logic (CRUD requests, rendering, summary)
- `database.sql` - Database schema export
- `expense_tracker/` - Spring Boot backend project
  - `src/main/java/com/uts/expense_tracker/controller/ExpenseController.java` - REST endpoints
  - `src/main/java/com/uts/expense_tracker/service/ExpenseService.java` - Business logic
  - `src/main/java/com/uts/expense_tracker/repository/ExpenseRepository.java` - Data repository
  - `src/main/java/com/uts/expense_tracker/entity/Expense.java` - Expense entity
  - `src/main/resources/application.properties` - DB connection and JPA settings

## How to Run

1. Create a MySQL database and import `database.sql`.
2. Update DB username/password in `expense_tracker/src/main/resources/application.properties` if needed.
3. Start backend:
   - Open terminal in `expense_tracker`
   - Run: `./mvnw spring-boot:run`
4. Open `index.html` in browser.
5. Use the UI to add, edit, and delete expenses.

## Challenges and Solutions

I think the most diffcult part of this project is to build stable CRUD interactions between the frontend and backend, especially for update and delete flows.  
I solved this by using API endpoints and request methods (`POST`, `PUT`, `DELETE`) and adding explicit frontend error handling for non-OK responses.  
Another challenge was keeping UI state consistent while editing data. I added form state switching (Add vs Update mode), cached fetched data, and refresh-after-write behavior to avoid stale views.  
I also improved API response correctness by returning `404` for missing records and `201` for successful creation.  
Finally, I added live summaries (total and category totals), filter controls (date range + category), and a monthly expenditure trend view so users can analyze spending patterns quickly.

## Notes

- Recommended environment: Java 21+, MySQL 8+, modern browser.

- Member Contributions
Feixu Chen (Member C) — Admin Module
Backend files:

expense_tracker/src/main/java/com/uts/expense_tracker/entity/UserActivity.java
expense_tracker/src/main/java/com/uts/expense_tracker/repository/UserActivityRepository.java
expense_tracker/src/main/java/com/uts/expense_tracker/service/UserActivityService.java
expense_tracker/src/main/java/com/uts/expense_tracker/controller/AdminController.java
expense_tracker/src/main/java/com/uts/expense_tracker/controller/AuthController.java (modified)
expense_tracker/src/main/java/com/uts/expense_tracker/controller/ExpenseController.java (modified)
expense_tracker/src/main/java/com/uts/expense_tracker/service/UserService.java (modified)
expense_tracker/src/main/java/com/uts/expense_tracker/config/JwtFilter.java (modified)
expense_tracker/src/main/java/com/uts/expense_tracker/config/CorsConfig.java (modified)
expense_tracker/src/main/java/com/uts/expense_tracker/config/SecurityConfig.java (modified)

Frontend files:

frontend/src/pages/AdminPage.jsx
frontend/src/features/admin/ActivityLog.jsx
frontend/src/features/admin/UserManagement.jsx
frontend/src/pages/LoginPage.jsx
frontend/src/styles/index.css (modified)

What I built:
I built the admin module, which includes a User Management table and an Activity Log. The Activity Log automatically records every user action — registration, login, and expense operations — using a UserActivity entity stored in the database. The User Management table allows admins to edit user roles or delete accounts, with a restriction that prevents admins from deleting their own account.
Admin routes are protected by two layers: Spring Security's hasRole('ADMIN') in SecurityConfig, and @PreAuthorize("hasRole('ADMIN')") on the AdminController. I also updated ExpenseController to read the real user ID from the JWT token instead of a hardcoded value, so each user only sees their own expenses.
