package com.kosmetichka.backend.dtos.responses;

import java.util.UUID;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BrandResponse {
    private UUID id;
    private String name;
    private String description;
    private String logoUrl;
}
