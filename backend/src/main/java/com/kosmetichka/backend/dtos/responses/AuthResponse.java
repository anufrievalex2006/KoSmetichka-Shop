package com.kosmetichka.backend.dtos.responses;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String accessToken;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String refreshToken;
}
