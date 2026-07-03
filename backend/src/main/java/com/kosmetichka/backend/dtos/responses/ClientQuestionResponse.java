package com.kosmetichka.backend.dtos.responses;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ClientQuestionResponse extends AppealResponse {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private String fullName;
}
