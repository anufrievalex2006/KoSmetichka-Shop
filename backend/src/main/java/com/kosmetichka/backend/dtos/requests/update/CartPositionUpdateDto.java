package com.kosmetichka.backend.dtos.requests.update;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartPositionUpdateDto {
    @NotNull(message = "Введите количество товара")
    @Min(value = 1, message = "Количество товара должно быть больше нуля")
    private Integer quantity;
}
