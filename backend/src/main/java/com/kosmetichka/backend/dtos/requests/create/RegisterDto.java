package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {
    @NotBlank(message = "Введите свое имя")
    private String name;
    @NotBlank(message = "Введите свою почту")
    @Email(message = "Некорректный формат почты")
    private String email;
    @NotBlank(message = "Введите свой номер телефона")
    private String phone;
    @NotBlank(message = "Введите пароль")
    @Size(min = 8, message = "Пароль должен быть длиной не менее 8 символов")
    private String password;
}
