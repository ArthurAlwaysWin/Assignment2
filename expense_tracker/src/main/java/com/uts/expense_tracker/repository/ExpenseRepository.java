package com.uts.expense_tracker.repository;

import com.uts.expense_tracker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer>{

    List<Expense> findByUserId(Integer userId);
    List<Expense> findByUserIdAndTitleContainingIgnoreCase(Integer userId, String title);
}
