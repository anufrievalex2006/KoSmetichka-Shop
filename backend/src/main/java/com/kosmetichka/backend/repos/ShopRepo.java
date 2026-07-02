package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.Shop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ShopRepo extends JpaRepository<Shop, UUID> {
}
