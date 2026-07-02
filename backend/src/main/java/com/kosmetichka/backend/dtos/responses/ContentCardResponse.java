package com.kosmetichka.backend.dtos.responses;

import com.kosmetichka.backend.models.enums.ContentType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContentCardResponse {
    private UUID id;
    private String title;
    private String description;
    private ContentType type;
    private String photoUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
