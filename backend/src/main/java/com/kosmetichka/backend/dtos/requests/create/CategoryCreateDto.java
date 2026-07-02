package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryCreateDto {
    @NotBlank(message = "Введите название категории")
    private String name;
}
