package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.ShopContact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ShopContactRepo extends JpaRepository<ShopContact, UUID> {
}
