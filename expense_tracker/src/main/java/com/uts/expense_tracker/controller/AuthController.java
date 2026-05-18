package com.uts.expense_tracker.controller;

import com.uts.expense_tracker.entity.User;
import com.uts.expense_tracker.service.UserActivityService;
import com.uts.expense_tracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserActivityService userActivityService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();
        try {
            User saved = userService.registerUser(user);
            userActivityService.logActivity(saved.getId(), "REGISTER", "User registered: " + saved.getUsername());
            response.put("message", "User registered successfully");
            response.put("username", saved.getUsername());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        try {
            Map<String, String> response = userService.loginUser(user.getUsername(), user.getPassword());
            userActivityService.logActivity(
                    userService.getUserIdByUsername(user.getUsername()),
                    "LOGIN",
                    "User logged in: " + user.getUsername()
            );
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
}