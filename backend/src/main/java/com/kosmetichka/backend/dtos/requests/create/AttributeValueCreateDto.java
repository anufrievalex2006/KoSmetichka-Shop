package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttributeValueCreateDto {
    @NotNull(message = "Выберите атрибут")
    private UUID attributeId;
    @NotBlank(message = "Введите значение атрибута")
    private String value;
}
