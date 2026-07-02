package com.kosmetichka.backend.dtos.requests.update;

import jakarta.validation.constraints.Email;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDto {
    private String name;
    @Email(message = "Некорректный формат почты")
    private String email;
    private String phone;
}
