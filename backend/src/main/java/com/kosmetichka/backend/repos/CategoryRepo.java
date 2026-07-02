package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryRepo extends JpaRepository<Category, UUID> {
}
