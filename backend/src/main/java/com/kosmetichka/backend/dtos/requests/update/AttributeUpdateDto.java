package com.kosmetichka.backend.dtos.requests.update;

import com.kosmetichka.backend.models.enums.AttributeType;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttributeUpdateDto {
    private String name;
    private AttributeType type;
    private String unit;
    private List<@NotBlank String> enumValues;
}
