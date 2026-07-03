package com.kosmetichka.backend.dtos.responses;

import com.kosmetichka.backend.models.enums.AppealStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class AppealResponse {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID id;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String content;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private AppealStatus status;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String contactEmail;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String contactPhone;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String appealType;
    @Schema(nullable = true)
    private UserResponse user;
}
