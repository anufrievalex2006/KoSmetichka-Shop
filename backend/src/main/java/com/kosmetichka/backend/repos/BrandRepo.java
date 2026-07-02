package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BrandRepo extends JpaRepository<Brand, UUID> {
}
