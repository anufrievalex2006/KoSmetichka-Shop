package com.kosmetichka.backend.dtos.requests.update;

import com.kosmetichka.backend.dtos.requests.create.ShopContactCreateDto;
import jakarta.validation.Valid;
import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShopUpdateDto {
    private String name;
    private String description;
    private String address;
    @Valid
    private List<ShopContactCreateDto> contacts;
}
