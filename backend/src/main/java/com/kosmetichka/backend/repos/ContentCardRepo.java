package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.ContentCard;
import com.kosmetichka.backend.models.enums.ContentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ContentCardRepo extends JpaRepository<ContentCard, UUID> {
    List<ContentCard> findByType(ContentType type);
}
