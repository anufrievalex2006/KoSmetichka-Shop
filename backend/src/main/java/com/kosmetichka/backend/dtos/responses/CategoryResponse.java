package com.kosmetichka.backend.dtos.responses;

import java.util.List;
import java.util.UUID;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse {
    private UUID id;
    private String name;
    private List<AttributeResponse> attributes;
}
