package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.CartPositionCreateDto;
import com.kosmetichka.backend.dtos.requests.update.CartPositionUpdateDto;
import com.kosmetichka.backend.dtos.responses.CartResponse;
import com.kosmetichka.backend.security.UserPrincipal;
import com.kosmetichka.backend.services.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService service;

    private UserPrincipal principal() {
        return (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
    @GetMapping
    public ResponseEntity<CartResponse> getCart() {
        return ResponseEntity.ok(service.getCart(principal()));
    }
    @PostMapping("/positions")
    public ResponseEntity<CartResponse> addPosition(@Valid  @RequestBody CartPositionCreateDto req) {
        return ResponseEntity.ok(service.addPosition(principal(), req));
    }
    @PatchMapping("/positions/{id}")
    public ResponseEntity<CartResponse> updatePosition(@PathVariable UUID id,
                                                       @Valid @RequestBody CartPositionUpdateDto req) {
        return ResponseEntity.ok(service.updatePosition(principal(), id, req));
    }
    @DeleteMapping("/positions/{id}")
    public ResponseEntity<CartResponse> deletePosition(@PathVariable UUID id) {
        return ResponseEntity.ok(service.deletePosition(principal(), id));
    }
    @DeleteMapping
    public ResponseEntity<Void> clearCart() {
        service.clearCart(principal());
        return ResponseEntity.noContent().build();
    }
}
