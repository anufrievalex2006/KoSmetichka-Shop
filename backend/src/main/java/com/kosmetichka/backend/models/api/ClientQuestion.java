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
@DiscriminatorValue("CLIENT_QUESTION")
public class ClientQuestion extends Appeal {
    private String fullName;
}
