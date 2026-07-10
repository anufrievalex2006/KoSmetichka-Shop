package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.AttributeCreateDto;
import com.kosmetichka.backend.dtos.requests.update.AttributeUpdateDto;
import com.kosmetichka.backend.dtos.responses.AttributeResponse;
import com.kosmetichka.backend.services.AttributeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "Атрибуты", description = "Атрибуты категорий товаров - CRUD")
@RestController
@RequestMapping("/api/attributes")
@RequiredArgsConstructor
public class AttributeController {
    private final AttributeService service;

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<AttributeResponse>> getByCategory(@PathVariable UUID categoryId) {
        return ResponseEntity.ok(service.getByCategory(categoryId));
    }
    @PostMapping
    public ResponseEntity<AttributeResponse> create(@Valid  @RequestBody AttributeCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }
    @PatchMapping("/{id}")
    public ResponseEntity<AttributeResponse> update(@PathVariable UUID id, @Valid @RequestBody AttributeUpdateDto req) {
        return ResponseEntity.ok(service.update(id, req));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
