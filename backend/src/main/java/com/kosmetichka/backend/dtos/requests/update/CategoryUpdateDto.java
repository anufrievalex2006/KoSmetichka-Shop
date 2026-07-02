package com.kosmetichka.backend.dtos.requests.update;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryUpdateDto {
    private String name;
}
