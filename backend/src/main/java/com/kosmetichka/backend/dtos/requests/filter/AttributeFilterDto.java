package com.kosmetichka.backend.dtos.requests.filter;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttributeFilterDto {
    private String value;
    private String min;
    private String max;
}
