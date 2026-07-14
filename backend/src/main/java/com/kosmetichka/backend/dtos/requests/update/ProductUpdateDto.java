package com.kosmetichka.backend.dtos.requests.update;

import com.kosmetichka.backend.dtos.requests.create.AttributeValueCreateDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductUpdateDto {
    private String name;
    private String barCodeNumber;
    private String article;
    private String description;
    private String photoUrl;
    @Min(value = 0, message = "Количество товара должно быть больше нуля")
    private Integer quantity;
    @DecimalMin(value = "0.0", inclusive = false, message = "Цена товара должна быть больше нуля")
    private BigDecimal price;
    private UUID categoryId;
    private UUID brandId;
    private List<@Valid AttributeValueCreateDto> attributeValues;
}
