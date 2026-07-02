package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.AttributeValue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AttributeValueRepo extends JpaRepository<AttributeValue, UUID> {
}
