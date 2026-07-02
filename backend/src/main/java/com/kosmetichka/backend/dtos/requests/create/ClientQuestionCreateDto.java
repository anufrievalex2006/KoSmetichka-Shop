package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ClientQuestionCreateDto extends AppealCreateDto {
    @NotBlank(message = "Введите свое полное имя")
    private String fullName;
}
