package com.kosmetichka.backend.dtos.responses;

import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartPositionResponse {
    private UUID id;
    private Integer quantity;
    private BigDecimal price;
    private ProductResponse product;
}
