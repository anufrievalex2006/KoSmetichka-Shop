package com.kosmetichka.backend.dtos.requests.update;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PasswordUpdateDto {
    @NotBlank(message = "Введите свой текущий пароль")
    private String oldPassword;
    @NotBlank(message = "Введите новый пароль")
    @Size(min = 8, message = "Пароль должен быть длиной хотя бы 8 символов")
    private String newPassword;
}
