package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.reset_password.ForgotPasswordDto;
import com.kosmetichka.backend.dtos.requests.reset_password.ResetPasswordDto;
import com.kosmetichka.backend.models.api.PasswordResetToken;
import com.kosmetichka.backend.models.api.User;
import com.kosmetichka.backend.repos.PasswordResetTokenRepo;
import com.kosmetichka.backend.repos.UserRepo;
import com.kosmetichka.backend.utilities.exceptions.BadRequestException;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService {
    private final UserRepo repo;
    private final PasswordResetTokenRepo tokenRepo;
    private final EmailService service;
    private final PasswordEncoder encoder;

    @Value("${app.frontend-url}")
    private String frontendUrl;
    @Value("${app.password-reset-expiration}")
    private long expiration;

    @Transactional
    public void requestReset(ForgotPasswordDto req) {
        User u = repo.findByEmail(req.getEmail())
                .orElseThrow(() -> new NotFoundException("Пользователь с таким email не найден"));
        tokenRepo.deleteByUser(u);

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .user(u)
                .expiresAt(LocalDateTime.now().plus(Duration.ofMillis(expiration)))
                .build();
        tokenRepo.save(resetToken);

        String link = frontendUrl + "/reset-password?token=" + token;
        service.sendPasswordResetEmail(u.getEmail(), link);
    }
    @Transactional
    public void resetPassword(ResetPasswordDto req) {
        PasswordResetToken resetToken = tokenRepo.findByToken(req.getToken())
                .orElseThrow(() -> new BadRequestException("Недействительная ссылка для сброса пароля!"));

        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            tokenRepo.delete(resetToken);
            throw new BadRequestException("Срок действия ссылки уже истек");
        }

        User u = resetToken.getUser();
        u.setPassword(encoder.encode(req.getNewPassword()));
        repo.save(u);

        tokenRepo.delete(resetToken);
    }
}
