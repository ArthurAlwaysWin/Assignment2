package com.uts.expense_tracker.controller;

import com.uts.expense_tracker.entity.User;
import com.uts.expense_tracker.entity.UserActivity;
import com.uts.expense_tracker.repository.UserRepository;
import com.uts.expense_tracker.service.UserActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserActivityService userActivityService;

    @Autowired
    private UserRepository userRepository;

    record UserDTO(Integer id, String username, String email, String role) {}

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
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userRepository.findAll().stream()
                .map(u -> new UserDTO(u.getId(), u.getUsername(), u.getEmail(), u.getRole()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        Optional<User> opt = userRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        User user = opt.get();
        if (body.containsKey("username")) user.setUsername(body.get("username"));
        if (body.containsKey("email")) user.setEmail(body.get("email"));
        if (body.containsKey("role")) user.setRole(body.get("role"));
        userRepository.save(user);
        return ResponseEntity.ok(new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getRole()));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id,
                                        @AuthenticationPrincipal UserDetails currentUser) {
        Optional<User> opt = userRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        User target = opt.get();
        if (target.getUsername().equals(currentUser.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Cannot delete yourself"));
        }

        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}