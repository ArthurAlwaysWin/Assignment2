package com.uts.expense_tracker.controller;

import com.uts.expense_tracker.entity.Expense;
import com.uts.expense_tracker.service.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;


@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService){
        this.expenseService = expenseService;
    }

    //Returns the id of the currently logged-in user.
    //TODO (Member A): Replace with real user id from JWT / SecurityContext.
    //Temporary value 1 is for development until auth module is ready.
    private Integer getCurrentUserId() {
        return 1;
    }


    //List all expenses for the current user only.
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getExpensesByUserId(getCurrentUserId());
    }

    //Search expenses by title for the current user (case-insensitive).
    //Example: GET /api/expenses/search?q=lunch
    @GetMapping("/search")
    public List<Expense> searchExpenses(@RequestParam(required = false) String q) {
        return expenseService.searchByUserIdAndTitle(getCurrentUserId(), q);
    }



    @PostMapping
    public ResponseEntity<?> createExpense(@RequestBody Expense expense){
        try{
            Expense saved = expenseService.saveExpense(expense, getCurrentUserId());
            // Return 201 when a new expense is created successfully.
            return ResponseEntity.status(201).body(saved);
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExpense(@PathVariable Integer id, @RequestBody Expense updated) {
        try {
            Expense saved = expenseService.updateExpense(id, updated, getCurrentUserId());
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (NoSuchElementException e) {
            // Return 404 when the target record does not exist or belongs to another user.
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

     @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Integer id) {
        try {
            expenseService.deleteExpense(id, getCurrentUserId());
            return ResponseEntity.ok("delete ok");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
