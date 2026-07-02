package com.kosmetichka.backend.dtos.responses;

import com.kosmetichka.backend.models.enums.ContactType;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShopContactResponse {
    private UUID id;
    private String label;
    private ContactType type;
    private String value;
}
