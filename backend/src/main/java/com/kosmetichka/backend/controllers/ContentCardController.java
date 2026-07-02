package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.ContentCardCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ContentCardUpdateDto;
import com.kosmetichka.backend.dtos.responses.ContentCardResponse;
import com.kosmetichka.backend.models.enums.ContentType;
import com.kosmetichka.backend.services.ContentCardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
public class ContentCardController {
    private final ContentCardService service;

    @GetMapping
    public ResponseEntity<List<ContentCardResponse>> get(@RequestParam(required = false) ContentType type) {
        if (type != null) return ResponseEntity.ok(service.getByType(type));
        return ResponseEntity.ok(service.get());
    }
    @GetMapping("/{id}")
    public ResponseEntity<ContentCardResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.getById(id));
    }
    @PostMapping
    public ResponseEntity<ContentCardResponse> create(@Valid @RequestBody ContentCardCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }
    @PatchMapping("/{id}")
    public ResponseEntity<ContentCardResponse> update(@PathVariable UUID id, @Valid @RequestBody ContentCardUpdateDto req) {
        return ResponseEntity.ok(service.update(id, req));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
