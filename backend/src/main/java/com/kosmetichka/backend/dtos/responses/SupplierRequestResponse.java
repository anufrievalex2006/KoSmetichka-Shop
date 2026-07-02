package com.kosmetichka.backend.dtos.responses;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SupplierRequestResponse extends AppealResponse {
    private String companyName;
}
