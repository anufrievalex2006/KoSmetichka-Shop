package com.kosmetichka.backend.dtos.responses;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StatisticsResponse {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDate date;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private long count;
}
