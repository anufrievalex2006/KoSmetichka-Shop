package com.kosmetichka.backend.dtos.responses;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttributeValueResponse {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID id;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String value;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private AttributeResponse attribute;
}
