package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.ShopCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ShopUpdateDto;
import com.kosmetichka.backend.dtos.responses.ShopResponse;
import com.kosmetichka.backend.services.ShopService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Магазин КоSметичка", description = "Общие сведения о магазине")
@RestController
@RequestMapping("/api/shop")
@RequiredArgsConstructor
public class ShopController {
    private final ShopService service;

    @GetMapping
    public ResponseEntity<ShopResponse> get() {
        return ResponseEntity.ok(service.get());
    }
    @PatchMapping()
    public ResponseEntity<ShopResponse> update(@Valid @RequestBody ShopUpdateDto req) {
        return ResponseEntity.ok(service.update(req));
    }
}
