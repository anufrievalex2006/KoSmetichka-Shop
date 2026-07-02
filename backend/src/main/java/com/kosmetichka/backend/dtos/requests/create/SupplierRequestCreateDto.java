package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SupplierRequestCreateDto extends AppealCreateDto {
    @NotBlank(message = "Введите название компании")
    private String companyName;
}
