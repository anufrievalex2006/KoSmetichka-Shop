package com.kosmetichka.backend.dtos.responses;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartResponse {
    private UUID id;
    private List<CartPositionResponse> positions;
    private BigDecimal total;
}
