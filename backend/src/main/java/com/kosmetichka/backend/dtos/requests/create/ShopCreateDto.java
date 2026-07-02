package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShopCreateDto {
    @NotBlank(message = "Введите название магазина")
    private String name;
    private String description;
    @NotBlank(message = "Введите адрес магазина")
    private String address;
    @Valid
    private List<ShopContactCreateDto> contacts;
}
