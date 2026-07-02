package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.SupplierRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SupplierRequestRepo extends JpaRepository<SupplierRequest, UUID> {
}
