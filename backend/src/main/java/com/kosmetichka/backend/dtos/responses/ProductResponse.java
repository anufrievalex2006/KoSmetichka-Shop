package com.kosmetichka.backend.dtos.responses;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private UUID id;
    private String name;
    private String barCodeNumber;
    private String article;
    private String description;
    private Integer quantity;
    private BigDecimal price;
    private CategoryResponse category;
    private BrandResponse brand;
    private List<AttributeValueResponse> attributeValues;
}
