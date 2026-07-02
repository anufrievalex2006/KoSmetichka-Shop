package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CartRepo extends JpaRepository<Cart, UUID> {
    Optional<Cart> findByUserId(UUID id);
}
