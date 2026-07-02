package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.update.PasswordUpdateDto;
import com.kosmetichka.backend.dtos.requests.update.UserUpdateDto;
import com.kosmetichka.backend.dtos.responses.StatisticsResponse;
import com.kosmetichka.backend.dtos.responses.UserResponse;
import com.kosmetichka.backend.security.UserPrincipal;
import com.kosmetichka.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    private UserPrincipal principal() {
        return (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
    @GetMapping("/statistics")
    public ResponseEntity<List<StatisticsResponse>> getStatistics() {
        return ResponseEntity.ok(service.getStatistics());
    }
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMe() {
        return ResponseEntity.ok(service.getProfile(principal()));
    }
    @PatchMapping("/me")
    public ResponseEntity<UserResponse> updateMe(@Valid @RequestBody UserUpdateDto req) {
        return ResponseEntity.ok(service.updateProfile(principal(), req));
    }
    @PatchMapping("/me/password")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody PasswordUpdateDto req) {
        service.changePassword(principal(), req);
        return ResponseEntity.noContent().build();
    }

    // Админка
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAll() {
        return ResponseEntity.ok(service.get());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
