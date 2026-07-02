package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.PasswordResetToken;
import com.kosmetichka.backend.models.api.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PasswordResetTokenRepo extends JpaRepository<PasswordResetToken, UUID> {
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByUser(User u);
}
