package com.kosmetichka.backend.dtos.requests.update;

import com.kosmetichka.backend.models.enums.UserRole;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRoleUpdateDto {
    @NotNull(message = "Укажите новую роль пользователя")
    private UserRole role;
}
