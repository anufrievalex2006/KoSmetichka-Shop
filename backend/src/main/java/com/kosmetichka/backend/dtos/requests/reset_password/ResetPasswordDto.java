package com.kosmetichka.backend.dtos.requests.reset_password;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordDto {
    @NotBlank(message = "Введите токен")
    private String token;
    @NotBlank(message = "Введите новый пароль")
    @Size(min = 8, message = "Пароль должен быть длиной хотя бы 8 символов")
    private String newPassword;
}
