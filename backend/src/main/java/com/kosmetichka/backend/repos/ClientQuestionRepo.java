package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.ClientQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ClientQuestionRepo extends JpaRepository<ClientQuestion, UUID> {
}
