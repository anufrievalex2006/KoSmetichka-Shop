package com.kosmetichka.backend.dtos.responses;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID id;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;
    @Schema(nullable = true)
    private String barCodeNumber;
    @Schema(nullable = true)
    private String article;
    @Schema(nullable = true)
    private String description;
    @Schema(nullable = true)
    private String photoUrl;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private boolean inStock;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer quantity;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private BigDecimal price;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private CategoryResponse category;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private BrandResponse brand;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<AttributeValueResponse> attributeValues;
}
