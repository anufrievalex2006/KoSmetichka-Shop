package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.Appeal;
import com.kosmetichka.backend.models.enums.AppealStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AppealRepo extends JpaRepository<Appeal, UUID> {
    long countByStatus(AppealStatus status);
}
