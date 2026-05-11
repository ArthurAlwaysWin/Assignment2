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

    @GetMapping
    public List<Expense> getAllExpenses(){
        return expenseService.getAllExpenses();
    }

    @PostMapping
    public ResponseEntity<?> createExpense(@RequestBody Expense expense){
        try{
            Expense saved = expenseService.saveExpense(expense);
            // Return 201 when a new expense is created successfully.
            return ResponseEntity.status(201).body(saved);
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExpense(@PathVariable Integer id, @RequestBody Expense updated){
        try{
            Expense saved = expenseService.updateExpense(id, updated);
            return ResponseEntity.ok(saved);
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (NoSuchElementException e) {
            // Return 404 when the target record does not exist.
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Integer id){
        try{
            expenseService.deleteExpense(id);
            return ResponseEntity.ok("delete ok");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
