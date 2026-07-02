package com.kosmetichka.backend.dtos.responses;

import com.kosmetichka.backend.models.enums.AppealStatus;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class AppealResponse {
    private UUID id;
    private String content;
    private AppealStatus status;
    private String contactEmail;
    private String contactPhone;
    private String appealType;
    private UserResponse user;
}
