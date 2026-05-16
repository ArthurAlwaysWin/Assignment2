package com.uts.expense_tracker.controller;

import com.uts.expense_tracker.entity.UserActivity;
import com.uts.expense_tracker.service.UserActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private UserActivityService userActivityService;

    @GetMapping("/activities")
    public ResponseEntity<List<UserActivity>> getAllActivities() {
        return ResponseEntity.ok(userActivityService.getAllActivities());
    }

    @GetMapping("/activities/user/{userId}")
    public ResponseEntity<List<UserActivity>> getActivitiesByUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(userActivityService.getActivitiesByUserId(userId));
    }

    @DeleteMapping("/activities/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Integer id) {
        userActivityService.deleteActivity(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(List.of(Map.of("id", 1, "username", "admin", "email", "admin@example.com", "role", "ADMIN")));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(Map.of("message", "User updated"));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        return ResponseEntity.noContent().build();
    }
}