package com.uts.expense_tracker.service;

import com.uts.expense_tracker.entity.Expense;
import com.uts.expense_tracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository){
        this.expenseRepository = expenseRepository;
    }

    // public List<Expense> getAllExpenses(){
    //     return expenseRepository.findAll();
    // }

    // public Optional<Expense> getExpenseById(Integer id) throws NullPointerException{
    //     //find a record
    //     return expenseRepository.findById(id);
    // }


    /**
     * Returns all expenses that belong to the given user.
     * Used by the list API after login (Member A will supply userId from JWT later).
     */
    public List<Expense> getExpensesByUserId(Integer userId) {
        return expenseRepository.findByUserId(userId);
    }
    /**
     * Search expenses by title for one user (case-insensitive).
     * If keyword is null or blank, returns all expenses for that user.
     */
    public List<Expense> searchByUserIdAndTitle(Integer userId, String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getExpensesByUserId(userId);
        }
        return expenseRepository.findByUserIdAndTitleContainingIgnoreCase(
                userId,
                keyword.trim()
        );
    }
    /**
     * Finds one expense only if it exists and belongs to the given user.
     * Empty Optional means "not found" or "belongs to another user".
     */
    public Optional<Expense> getExpenseByIdAndUserId(Integer id, Integer userId) {
        return expenseRepository.findById(id)
                .filter(expense -> expense.getUserId().equals(userId));
    }






    /**
     * Creates a new expense for the given user.
     * Always sets userId on the server; never trusts userId from the request body alone.
     */
    public Expense saveExpense(Expense expense, Integer userId) {
        validateAmount(expense);
        expense.setUserId(userId);
        return expenseRepository.save(expense);
    }
    /**
     * Updates an expense only if it belongs to the given user.
     */
    public Expense updateExpense(Integer id, Expense updated, Integer userId) {
        getExpenseByIdAndUserId(id, userId)
                .orElseThrow(() -> new NoSuchElementException(
                        "Cannot find record with id [" + id + "]"
                ));
        validateAmount(updated);
        updated.setId(id);
        updated.setUserId(userId);
        return expenseRepository.save(updated);
    }
    /**
     * Deletes an expense only if it belongs to the given user.
     */
    public void deleteExpense(Integer id, Integer userId) {
        if (getExpenseByIdAndUserId(id, userId).isEmpty()) {
            throw new NoSuchElementException(
                    "Cannot find record with id [" + id + "], delete failed"
            );
        }
        expenseRepository.deleteById(id);
    }
    /**
     * Shared validation for create and update.
     */
    private void validateAmount(Expense expense) {
        if (expense.getAmount() != null && expense.getAmount().signum() <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero"); 
        }
    }
}
