package com.kosmetichka.backend.dtos.responses;

import lombok.*;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttributeValueResponse {
    private UUID id;
    private String value;
    private AttributeResponse attribute;
}
