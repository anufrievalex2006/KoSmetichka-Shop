package com.kosmetichka.backend.dtos.requests.reset_password;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ForgotPasswordDto {
    @NotBlank(message = "Введите email")
    @Email(message = "Некорректный формат почты")
    private String email;
}
