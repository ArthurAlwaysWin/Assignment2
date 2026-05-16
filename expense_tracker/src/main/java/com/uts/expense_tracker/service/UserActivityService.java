package com.uts.expense_tracker.service;

import com.uts.expense_tracker.entity.UserActivity;
import com.uts.expense_tracker.repository.UserActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserActivityService {

    @Autowired
    private UserActivityRepository userActivityRepository;

    public void logActivity(Integer userId, String action, String detail) {
        UserActivity activity = new UserActivity(userId, action, detail);
        userActivityRepository.save(activity);
    }

    public List<UserActivity> getActivitiesByUserId(Integer userId) {
        return userActivityRepository.findByUserIdOrderByTimestampDesc(userId);
    }

    public List<UserActivity> getAllActivities() {
        return userActivityRepository.findAllByOrderByTimestampDesc();
    }

    public void deleteActivity(Integer id) {
        userActivityRepository.deleteById(id);
    }
}