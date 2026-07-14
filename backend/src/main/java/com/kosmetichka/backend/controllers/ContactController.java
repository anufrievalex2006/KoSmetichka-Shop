package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.ShopContactCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ShopContactUpdateDto;
import com.kosmetichka.backend.dtos.responses.ShopContactResponse;
import com.kosmetichka.backend.services.ContactService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "Контакты", description = "Адреса, номера телефона и способы связи с магазином")
@RestController
@RequestMapping("/api/shop/contacts")
@RequiredArgsConstructor
public class ContactController {
    private final ContactService service;

    @GetMapping
    public ResponseEntity<List<ShopContactResponse>> get() {
        return ResponseEntity.ok(service.get());
    }
    @GetMapping("/{id}")
    public ResponseEntity<ShopContactResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.getById(id));
    }
    @PostMapping
    public ResponseEntity<ShopContactResponse> create(@Valid @RequestBody ShopContactCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }
    @PatchMapping("/{id}")
    public ResponseEntity<ShopContactResponse> update(@PathVariable UUID id, @Valid @RequestBody ShopContactUpdateDto req) {
        return ResponseEntity.ok(service.update(id, req));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
