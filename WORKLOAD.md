# Workload Statement

## Project

Expense Tracker Web Application for 32516 Internet Programming Assignment 2.

This document records the agreed team workload, the feature ownership for each member, and the main files contributed by each role.

## Team Members

| Member     | Student ID | Main Module                                                  |
| ---------- | ---------- | ------------------------------------------------------------ |
| Chiyu Song | 14087934   | User authentication and security                             |
| Qihang Liu | 14372104   | Expense management                                           |
| Feixu Chen | 25664297   | Admin module and user activity log                           |
| Xiao Li    | 25962717   | Project structure, shared UI, documentation, and integration |

## Chiyu Song - User Authentication and Security

**Responsibilities**

- User registration and login flow.
- JWT authentication support.
- Password hashing with BCrypt.
- Authentication context integration with the frontend.
- Login and registration pages.

**Main Files**

- `expense_tracker/src/main/java/com/uts/expense_tracker/entity/User.java`
- `expense_tracker/src/main/java/com/uts/expense_tracker/repository/UserRepository.java`
- `expense_tracker/src/main/java/com/uts/expense_tracker/service/UserService.java`
- `expense_tracker/src/main/java/com/uts/expense_tracker/util/JwtUtil.java`
- `expense_tracker/src/main/java/com/uts/expense_tracker/config/SecurityConfig.java`
- `expense_tracker/src/main/java/com/uts/expense_tracker/config/JwtFilter.java`
- `expense_tracker/src/main/java/com/uts/expense_tracker/controller/AuthController.java`
- `frontend/src/context/AuthContext.jsx`
- `frontend/src/pages/LoginPage.jsx`
- `frontend/src/pages/RegisterPage.jsx`

## Qihang Liu - Expense Management

**Responsibilities**

- Expense CRUD user interface.
- Expense form validation.
- Real-time expense search.
- Date and category filtering.
- Summary and monthly trend views.
- Backend expense API updates for user-specific data.

**Main Files**

- `expense_tracker/src/main/java/com/uts/expense_tracker/entity/Expense.java`
- `expense_tracker/src/main/java/com/uts/expense_tracker/repository/ExpenseRepository.java`
- `expense_tracker/src/main/java/com/uts/expense_tracker/service/ExpenseService.java`
- `expense_tracker/src/main/java/com/uts/expense_tracker/controller/ExpenseController.java`
- `frontend/src/pages/ExpensePage.jsx`
- `frontend/src/features/expense/ExpenseForm.jsx`
- `frontend/src/features/expense/SearchBar.jsx`
- `frontend/src/features/expense/ExpenseFilter.jsx`
- `frontend/src/features/expense/ExpenseSummary.jsx`
- `frontend/src/features/expense/MonthlyTrend.jsx`
- `frontend/src/features/expense/ExpenseList.jsx`
- `frontend/src/features/expense/ExpenseItem.jsx`

## Feixu Chen - Admin Module and User Activity Log

**Responsibilities**

- User activity entity, repository, and service.
- Activity logging for registration, login, and expense actions.
- Admin APIs for user management and activity log management.
- Admin frontend page with user and activity views.
- Admin access control checks.

**Main Files**

- `expense_tracker/src/main/java/com/uts/expense_tracker/entity/UserActivity.java`
- `expense_tracker/src/main/java/com/uts/expense_tracker/repository/UserActivityRepository.java`
- `expense_tracker/src/main/java/com/uts/expense_tracker/service/UserActivityService.java`
- `expense_tracker/src/main/java/com/uts/expense_tracker/controller/AdminController.java`
- `frontend/src/pages/AdminPage.jsx`
- `frontend/src/features/admin/UserManagement.jsx`
- `frontend/src/features/admin/ActivityLog.jsx`
- `expense_tracker/.../controller/ExpenseController.java`
- `frontend/src/pages/LoginPage.jsx`

## Xiao Li - Project Structure, Shared UI, Documentation, and Integration

**Responsibilities**

- React + Vite project setup.
- Shared frontend directory structure.
- Axios request wrapper with JWT interceptor.
- Main routing configuration.
- Shared layout, navigation, protected route, loading, and error boundary components.
- Global CSS and responsive styling.
- Home and profile pages.
- Backend CORS configuration.
- Project README, database script, workload statement, and demo flow coordination.

**Main Files**

- `frontend/package.json`
- `frontend/vite.config.js`
- `frontend/index.html`
- `frontend/src/main.jsx`
- `frontend/src/App.jsx`
- `frontend/src/api/request.js`
- `frontend/src/components/Navbar.jsx`
- `frontend/src/components/Layout.jsx`
- `frontend/src/components/ProtectedRoute.jsx`
- `frontend/src/components/Loading.jsx`
- `frontend/src/components/ErrorBoundary.jsx`
- `frontend/src/pages/HomePage.jsx`
- `frontend/src/pages/ProfilePage.jsx`
- `frontend/src/styles/index.css`
- `expense_tracker/src/main/java/com/uts/expense_tracker/config/CorsConfig.java`
- `README.md`
- `database.sql`
- `WORKLOAD.md`
