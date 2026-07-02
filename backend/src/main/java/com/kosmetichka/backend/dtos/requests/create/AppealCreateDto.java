package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public abstract class AppealCreateDto {
    @NotBlank(message = "Текст обращения обязателен")
    private String content;
    @NotBlank(message = "Введите почту")
    @Email(message = "Некорректный формат email")
    private String contactEmail;
    @NotBlank(message = "Введите номер телефона")
    private String contactPhone;
}
