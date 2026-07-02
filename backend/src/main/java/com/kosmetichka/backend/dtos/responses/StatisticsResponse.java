package com.kosmetichka.backend.dtos.responses;

import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StatisticsResponse {
    private LocalDate date;
    private long count;
}
