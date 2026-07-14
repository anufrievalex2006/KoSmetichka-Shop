package com.kosmetichka.backend.dtos.requests.update;

import com.kosmetichka.backend.models.enums.ContactType;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShopContactUpdateDto {
    private String label;
    private ContactType type;
    private String value;
}
