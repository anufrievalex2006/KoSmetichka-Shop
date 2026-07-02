package com.kosmetichka.backend.dtos.requests.update;

import com.kosmetichka.backend.models.enums.AttributeType;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttributeUpdateDto {
    private String name;
    private AttributeType type;
    private String unit;
}
