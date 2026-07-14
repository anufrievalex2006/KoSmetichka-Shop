package com.kosmetichka.backend.dtos.responses;

import com.kosmetichka.backend.models.enums.ContentType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContentCardResponse {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID id;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String title;
    @Schema(nullable = true)
    private String description;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private ContentType type;
    @Schema(nullable = true)
    private String photoUrl;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime createdAt;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime updatedAt;
}
