package com.kosmetichka.backend.dtos.responses;

import com.kosmetichka.backend.models.enums.UserRole;

import java.time.LocalDateTime;
import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID id;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;
    @Schema(nullable = true)
    private String phone;
    @Schema(nullable = true)
    private String avatarUrl;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private UserRole role;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime createdAt;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime updatedAt;
}
