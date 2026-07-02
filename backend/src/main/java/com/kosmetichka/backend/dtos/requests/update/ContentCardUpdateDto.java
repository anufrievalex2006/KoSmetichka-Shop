package com.kosmetichka.backend.dtos.requests.update;

import com.kosmetichka.backend.models.enums.ContentType;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContentCardUpdateDto {
    private String title;
    private String description;
    private ContentType type;
    private String photoUrl;
}
