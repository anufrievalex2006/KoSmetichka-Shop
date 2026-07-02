package com.kosmetichka.backend.dtos.requests.filter;

import lombok.*;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductFilterDto {
    private String search; // по имени или артикулу
    private UUID categoryId;
    private UUID brandId;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private Map<UUID, String> attributes;
}
