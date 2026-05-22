# Demo Video Script

## Goal

Record a demo video no longer than 3 minutes. The video should show the running application and user-facing functionality only. Do not show source code, database tools, IDE setup, or terminal troubleshooting.

## Pre-recording Checklist

- Backend is running at `http://localhost:8080`.
- Frontend is running at `http://localhost:5173`.
- MySQL database `expenses_tracker` is available.
- At least one normal user account is ready.
- At least one admin account is ready.
- Browser zoom is set to 100%.
- Test expense data is simple and readable.

## Suggested Timeline

| Time | Action | Presenter |
|------|--------|-----------|
| 0:00-0:15 | Open the app and briefly show the login/register entry points. | Member D |
| 0:15-0:35 | Register a new user, then log in. | Member A |
| 0:35-1:20 | Add, edit, and delete an expense. | Member B |
| 1:20-1:45 | Use real-time search, category filter, date filter, summary, and monthly trend. | Member B |
| 1:45-2:30 | Log in as admin and show user management plus activity log. | Member C |
| 2:30-2:50 | Return to the main app and show consistent navigation/layout. | Member D |
| 2:50-3:00 | End on the homepage or expense page. | Member D |

## Demo Steps

1. Open `http://localhost:5173`.
2. Register a user with a clear username and email.
3. Log in using that account.
4. Open the expense page.
5. Create a new expense, for example:
   - Title: `Lunch`
   - Category: `Food`
   - Amount: `18.50`
   - Date: current date
6. Edit the expense amount or description.
7. Add one more expense in a different category.
8. Type in the search bar and show the list filtering immediately.
9. Apply category and date filters.
10. Show the total summary and monthly trend area.
11. Delete one expense and confirm the list updates.
12. Log out.
13. Log in as an admin account.
14. Open the admin page.
15. Show the user management table.
16. Show the activity log table and point out the latest login or expense action.

## Speaking Notes

- "The application uses JWT authentication, so protected pages require a logged-in user."
- "Expense records are isolated per user."
- "The search bar filters expenses in real time."
- "The admin panel can review users and user activity logs."
- "The shared layout and protected routes integrate all modules into one application."

## Final Video Checks

- Video length is under 3 minutes.
- All text is readable.
- No passwords are spoken aloud after typing.
- No source code or database table is shown.
- The demo covers registration, login, expense CRUD, real-time search, and admin panel.
