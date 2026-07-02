package com.kosmetichka.backend.models.api;

import com.kosmetichka.backend.models.enums.ContactType;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "shop_contacts")
public class ShopContact {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String label;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContactType type;
    @Column(nullable = false)
    private String value;
    @ManyToOne
    @JoinColumn(name = "shop_id", nullable = false)
    private Shop shop;
}
