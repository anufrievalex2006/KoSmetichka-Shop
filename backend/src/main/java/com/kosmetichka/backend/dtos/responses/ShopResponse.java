package com.kosmetichka.backend.dtos.responses;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShopResponse {
    private UUID id;
    private String name;
    private String description;
    private String address;
    private List<ShopContactResponse> contacts;
}
