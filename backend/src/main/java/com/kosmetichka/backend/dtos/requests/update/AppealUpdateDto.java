package com.kosmetichka.backend.dtos.requests.update;

import com.kosmetichka.backend.models.enums.AppealStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AppealUpdateDto {
    @NotNull(message = "Выберите статус обращения")
    private AppealStatus status;
}
