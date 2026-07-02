package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.BrandCreateDto;
import com.kosmetichka.backend.dtos.requests.update.BrandUpdateDto;
import com.kosmetichka.backend.dtos.responses.BrandResponse;
import com.kosmetichka.backend.services.BrandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {
    private final BrandService service;

    @GetMapping
    public ResponseEntity<List<BrandResponse>> get() {
        return ResponseEntity.ok(service.get());
    }
    @GetMapping("/{id}")
    public ResponseEntity<BrandResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.getById(id));
    }
    @PostMapping
    public ResponseEntity<BrandResponse> create(@Valid @RequestBody BrandCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }
    @PatchMapping("/{id}")
    public ResponseEntity<BrandResponse> update(@PathVariable UUID id, @Valid  @RequestBody BrandUpdateDto req) {
        return ResponseEntity.ok(service.update(id, req));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
