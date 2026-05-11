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

    public List<Expense> getAllExpenses(){
        return expenseRepository.findAll();
    }

    public Optional<Expense> getExpenseById(Integer id) throws NullPointerException{
        //find a record
        return expenseRepository.findById(id);
    }

    public Expense saveExpense(Expense expense){
        // basic validation at service layer to keep API behavior consistent.
        if(expense.getAmount()!=null && expense.getAmount().signum() <0){
            throw new IllegalArgumentException("Amount cannot be negative");
        }

        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Integer id, Expense expense) {
        // ensure we are updating an existing record
        if (!expenseRepository.existsById(id)) {
            throw new NoSuchElementException("Cannot find record with id [" + id + "]");
        }
        expense.setId(id);
        return saveExpense(expense);
    }

    public void deleteExpense(Integer id){
        //simple validation before delete a record
        if(expenseRepository.existsById(id)){
            expenseRepository.deleteById(id);
        }else {
            throw new NoSuchElementException("Cannot find record with id [" + id + "], delete failed");
        }
    }
}
