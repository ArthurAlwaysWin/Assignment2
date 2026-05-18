package com.uts.expense_tracker.controller;

import com.uts.expense_tracker.entity.Expense;
import com.uts.expense_tracker.repository.UserRepository;
import com.uts.expense_tracker.service.ExpenseService;
import com.uts.expense_tracker.service.UserActivityService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    private final ExpenseService expenseService;
    private final UserActivityService userActivityService;
    private final UserRepository userRepository;

    public ExpenseController(ExpenseService expenseService, UserActivityService userActivityService, UserRepository userRepository) {
        this.expenseService = expenseService;
        this.userActivityService = userActivityService;
        this.userRepository = userRepository;
    }

    private Integer getCurrentUserId(UserDetails userDetails) {
        return userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @GetMapping
    public List<Expense> getAllExpenses(@AuthenticationPrincipal UserDetails userDetails) {
        return expenseService.getExpensesByUserId(getCurrentUserId(userDetails));
    }

    @GetMapping("/search")
    public List<Expense> searchExpenses(@RequestParam(required = false) String q,
                                        @AuthenticationPrincipal UserDetails userDetails) {
        return expenseService.searchByUserIdAndTitle(getCurrentUserId(userDetails), q);
    }

    @PostMapping
    public ResponseEntity<?> createExpense(@RequestBody Expense expense,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Integer userId = getCurrentUserId(userDetails);
            Expense saved = expenseService.saveExpense(expense, userId);
            userActivityService.logActivity(userId, "CREATE_EXPENSE", "Created: " + saved.getTitle() + " $" + saved.getAmount());
            return ResponseEntity.status(201).body(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExpense(@PathVariable Integer id, @RequestBody Expense updated,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Integer userId = getCurrentUserId(userDetails);
            Expense saved = expenseService.updateExpense(id, updated, userId);
            userActivityService.logActivity(userId, "UPDATE_EXPENSE", "Updated expense #" + id);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Integer id,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Integer userId = getCurrentUserId(userDetails);
            expenseService.deleteExpense(id, userId);
            userActivityService.logActivity(userId, "DELETE_EXPENSE", "Deleted expense #" + id);
            return ResponseEntity.ok("delete ok");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}