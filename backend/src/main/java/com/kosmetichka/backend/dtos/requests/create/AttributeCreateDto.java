package com.kosmetichka.backend.dtos.requests.create;

import com.kosmetichka.backend.models.enums.AttributeType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttributeCreateDto {
    @NotBlank(message = "Введите название атрибута")
    private String name;
    @NotNull(message = "Выберите тип атрибута")
    private AttributeType type;
    private String unit;
    @NotNull(message = "Выберите категорию, для которой создаете атрибут")
    private UUID categoryId;
    private List<@NotBlank String> enumValues;
}
