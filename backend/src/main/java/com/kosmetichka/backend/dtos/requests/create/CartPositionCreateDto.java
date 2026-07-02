package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartPositionCreateDto {
    @NotNull(message = "Выберите товар")
    private UUID productId;
    @NotNull(message = "Введите количество товара")
    @Min(value = 1, message = "Количество товара должно быть больше нуля")
    private Integer quantity;
}
