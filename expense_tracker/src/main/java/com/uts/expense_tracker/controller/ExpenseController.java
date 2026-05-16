package com.uts.expense_tracker.controller;

import com.uts.expense_tracker.entity.Expense;
import com.uts.expense_tracker.service.ExpenseService;
import com.uts.expense_tracker.service.UserActivityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;
    private final UserActivityService userActivityService;

    public ExpenseController(ExpenseService expenseService, UserActivityService userActivityService) {
        this.expenseService = expenseService;
        this.userActivityService = userActivityService;
    }

    // TODO (Member A): Replace with real user id from JWT / SecurityContext.
    private Integer getCurrentUserId() {
        return 1;
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getExpensesByUserId(getCurrentUserId());
    }

    @GetMapping("/search")
    public List<Expense> searchExpenses(@RequestParam(required = false) String q) {
        return expenseService.searchByUserIdAndTitle(getCurrentUserId(), q);
    }

    @PostMapping
    public ResponseEntity<?> createExpense(@RequestBody Expense expense) {
        try {
            Expense saved = expenseService.saveExpense(expense, getCurrentUserId());
            userActivityService.logActivity(
                    getCurrentUserId(),
                    "CREATE_EXPENSE",
                    "Created: " + saved.getTitle() + " $" + saved.getAmount()
            );
            return ResponseEntity.status(201).body(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExpense(@PathVariable Integer id, @RequestBody Expense updated) {
        try {
            Expense saved = expenseService.updateExpense(id, updated, getCurrentUserId());
            userActivityService.logActivity(
                    getCurrentUserId(),
                    "UPDATE_EXPENSE",
                    "Updated expense #" + id
            );
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Integer id) {
        try {
            expenseService.deleteExpense(id, getCurrentUserId());
            userActivityService.logActivity(
                    getCurrentUserId(),
                    "DELETE_EXPENSE",
                    "Deleted expense #" + id
            );
            return ResponseEntity.ok("delete ok");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}