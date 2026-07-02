package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.CartPosition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CartPositionRepo extends JpaRepository<CartPosition, UUID> {
}
