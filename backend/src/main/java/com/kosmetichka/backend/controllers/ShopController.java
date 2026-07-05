package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.ShopCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ShopUpdateDto;
import com.kosmetichka.backend.dtos.responses.ShopResponse;
import com.kosmetichka.backend.services.ShopService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
