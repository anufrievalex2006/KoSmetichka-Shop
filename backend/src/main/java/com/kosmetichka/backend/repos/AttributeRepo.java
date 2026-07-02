package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AttributeRepo extends JpaRepository<Attribute, UUID> {
    List<Attribute> findByCategoryId(UUID categoryId);
}
