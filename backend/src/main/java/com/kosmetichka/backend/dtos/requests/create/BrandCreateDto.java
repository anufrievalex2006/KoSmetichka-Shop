package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.validator.constraints.URL;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BrandCreateDto {
    @NotBlank(message = "Введите название бренда")
    private String name;
    private String description;
    @URL(message = "Некорректная ссылка на логотип")
    private String logoUrl;
}
