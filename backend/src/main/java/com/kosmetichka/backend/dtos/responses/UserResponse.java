package com.kosmetichka.backend.dtos.responses;

import com.kosmetichka.backend.models.enums.UserRole;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private UUID id;
    private String name;
    private String email;
    private String phone;
    private UserRole role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
