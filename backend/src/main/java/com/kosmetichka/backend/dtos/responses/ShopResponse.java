package com.kosmetichka.backend.dtos.responses;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShopResponse {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID id;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;
    @Schema(nullable = true)
    private String description;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String address;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<ShopContactResponse> contacts;
}
