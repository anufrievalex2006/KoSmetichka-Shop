package com.kosmetichka.backend.models.api;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@DiscriminatorValue("SUPPLIER_REQUEST")
public class SupplierRequest extends Appeal {
    @Column(nullable = false)
    private String companyName;
}
