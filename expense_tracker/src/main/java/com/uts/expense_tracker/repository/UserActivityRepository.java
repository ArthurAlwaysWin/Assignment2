package com.uts.expense_tracker.repository;

import com.uts.expense_tracker.entity.UserActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserActivityRepository extends JpaRepository<UserActivity, Integer> {

    List<UserActivity> findByUserIdOrderByTimestampDesc(Integer userId);

    List<UserActivity> findAllByOrderByTimestampDesc();
}