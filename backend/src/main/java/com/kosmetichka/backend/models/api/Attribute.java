package com.kosmetichka.backend.models.api;

import com.kosmetichka.backend.models.enums.AttributeType;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
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
    @ElementCollection
    @CollectionTable(name = "attribute_enum_values", joinColumns = @JoinColumn(name = "attribute_id"))
    @Column(name = "value", nullable = false)
    @Builder.Default
    private List<String> enumValues = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
