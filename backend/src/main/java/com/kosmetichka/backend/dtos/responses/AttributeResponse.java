package com.kosmetichka.backend.dtos.responses;

import com.kosmetichka.backend.models.enums.AttributeType;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttributeResponse {
    private UUID id;
    private String name;
    private AttributeType type;
    private String unit;
}
