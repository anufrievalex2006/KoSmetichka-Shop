package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.LoginDto;
import com.kosmetichka.backend.dtos.requests.create.RegisterDto;
import com.kosmetichka.backend.dtos.requests.reset_password.ForgotPasswordDto;
import com.kosmetichka.backend.dtos.requests.reset_password.ResetPasswordDto;
import com.kosmetichka.backend.dtos.responses.AuthResponse;
import com.kosmetichka.backend.services.AuthService;
import com.kosmetichka.backend.services.PasswordResetService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService service;
    private final PasswordResetService resetService;

    public record RefreshRequest(String refreshToken) {}

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid  @RequestBody RegisterDto req, HttpServletResponse res) {
        AuthResponse tokens = service.register(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(tokens);
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginDto req, HttpServletResponse res) {
        AuthResponse tokens = service.login(req);
        return ResponseEntity.ok(tokens);
    }
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody RefreshRequest req, HttpServletResponse res) {
        AuthResponse tokens = service.refresh(req.refreshToken);
        return ResponseEntity.ok(tokens);
    }
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse res) {
        clearAuthCookies(res);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/password/forgot")
    public ResponseEntity<Void> forgotPassword(@Valid @RequestBody ForgotPasswordDto req) {
        resetService.requestReset(req);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/password/reset")
    public ResponseEntity<Void> reset(@Valid @RequestBody ResetPasswordDto req) {
        resetService.resetPassword(req);
        return ResponseEntity.noContent().build();
    }

    private void clearAuthCookies(HttpServletResponse res) {
        ResponseCookie access = ResponseCookie.from("accessToken", "").path("/").maxAge(0).build();
        ResponseCookie refresh = ResponseCookie.from("refreshToken", "").path("/api/auth").maxAge(0).build();
        res.addHeader(HttpHeaders.SET_COOKIE, access.toString());
        res.addHeader(HttpHeaders.SET_COOKIE, refresh.toString());
    }
}
