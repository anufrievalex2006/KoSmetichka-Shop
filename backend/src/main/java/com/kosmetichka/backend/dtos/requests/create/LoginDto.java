package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {
    @NotBlank(message = "Введите почту")
    @Email(message = "Некорректный формат почты")
    private String email;
    @NotBlank(message = "Введите пароль")
    private String password;
    private Boolean rememberMe;
}
