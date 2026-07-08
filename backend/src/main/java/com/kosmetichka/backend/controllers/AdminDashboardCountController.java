package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.responses.AdminDashboardCountResponse;
import com.kosmetichka.backend.models.enums.UserRole;
import com.kosmetichka.backend.security.UserPrincipal;
import com.kosmetichka.backend.services.AdminDashboardCountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardCountController {
    private final AdminDashboardCountService service;

    @GetMapping("/count")
    public ResponseEntity<AdminDashboardCountResponse> get(@AuthenticationPrincipal UserPrincipal pr) {
        boolean isAdmin = pr.getUser().getRole() == UserRole.ADMIN;
        return ResponseEntity.ok(service.get(isAdmin));
    }
}
