package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.Appeal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AppealRepo extends JpaRepository<Appeal, UUID> {}
