package com.kosmetichka.backend.dtos.responses;

import com.kosmetichka.backend.models.enums.ContactType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShopContactResponse {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID id;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String label;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private ContactType type;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String value;
}
