package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.ClientQuestionCreateDto;
import com.kosmetichka.backend.dtos.requests.create.SupplierRequestCreateDto;
import com.kosmetichka.backend.dtos.requests.update.AppealUpdateDto;
import com.kosmetichka.backend.dtos.responses.AppealResponse;
import com.kosmetichka.backend.services.AppealService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/appeals")
@RequiredArgsConstructor
public class AppealController {
    private final AppealService service;

    @GetMapping
    public ResponseEntity<List<AppealResponse>> getAll() {
        return ResponseEntity.ok(service.get());
    }
    @PostMapping("/questions")
    public ResponseEntity<AppealResponse> createQuestion(@Valid  @RequestBody ClientQuestionCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createQuestion(req));
    }
    @PostMapping("/supplier-requests")
    public ResponseEntity<AppealResponse> createSupplierRequest(@Valid @RequestBody SupplierRequestCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createSupplierRequest(req));
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<AppealResponse> updateStatus(@PathVariable UUID id, @Valid @RequestBody AppealUpdateDto req) {
        return ResponseEntity.ok(service.updateStatus(id, req));
    }
}
