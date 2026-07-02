package com.kosmetichka.backend.dtos.requests.create;

import com.kosmetichka.backend.models.enums.ContactType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShopContactCreateDto {
    @NotBlank(message = "Введите подпись для контакта")
    private String label;
    @NotNull(message = "Выберите тип контакта")
    private ContactType type;
    @NotBlank(message = "Введите значение контакта")
    private String value;
}
