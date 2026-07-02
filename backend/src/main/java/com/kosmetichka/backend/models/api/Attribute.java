package com.kosmetichka.backend.models.api;

import com.kosmetichka.backend.models.enums.AttributeType;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "attributes")
public class Attribute {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String name;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttributeType type;
    private String unit;
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
