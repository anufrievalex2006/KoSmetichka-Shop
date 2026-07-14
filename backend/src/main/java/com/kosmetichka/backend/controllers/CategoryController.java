package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.CategoryCreateDto;
import com.kosmetichka.backend.dtos.requests.update.CategoryUpdateDto;
import com.kosmetichka.backend.dtos.responses.CategoryResponse;
import com.kosmetichka.backend.services.CategoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "Категории", description = "Категории товаров")
@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService service;

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> get() {
        return ResponseEntity.ok(service.get());
    }
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.getById(id));
    }
    @PostMapping
    public ResponseEntity<CategoryResponse> create(@Valid @RequestBody CategoryCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }
    @PatchMapping("/{id}")
    public ResponseEntity<CategoryResponse> update(@PathVariable UUID id, @Valid @RequestBody CategoryUpdateDto req) {
        return ResponseEntity.ok(service.update(id, req));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
