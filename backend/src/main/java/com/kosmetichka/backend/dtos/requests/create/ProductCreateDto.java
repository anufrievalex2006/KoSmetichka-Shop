package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductCreateDto {
    @NotBlank(message = "Введите название товара")
    private String name;
    private String barCodeNumber;
    private String article;
    private String description;
    @NotNull(message = "Введите количество товара")
    @Min(value = 0, message = "Количество товара не может быть отрицательным")
    private Integer quantity;
    @NotNull(message = "Введите цену товара")
    @DecimalMin(value = "0.0", inclusive = false, message = "Цена товара должна быть больше нуля")
    private BigDecimal price;
    @NotNull(message = "Выберите категорию товара")
    private UUID categoryId;
    @NotNull(message = "Выберите производителя товара")
    private UUID brandId;
    @Valid
    private List<AttributeValueCreateDto> attributeValues;
}
