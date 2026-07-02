package com.kosmetichka.backend.dtos.requests.update;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BrandUpdateDto {
    private String name;
    private String description;
    private String logoUrl;
}
