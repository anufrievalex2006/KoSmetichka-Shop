package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.ClientQuestionCreateDto;
import com.kosmetichka.backend.dtos.requests.create.SupplierRequestCreateDto;
import com.kosmetichka.backend.dtos.requests.update.AppealUpdateDto;
import com.kosmetichka.backend.dtos.responses.AppealResponse;
import com.kosmetichka.backend.dtos.responses.ClientQuestionResponse;
import com.kosmetichka.backend.dtos.responses.SupplierRequestResponse;
import com.kosmetichka.backend.services.AppealService;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
    @ApiResponse(responseCode = "200", content = @Content(
            array = @ArraySchema(schema = @Schema(
                    type = "object",
                    oneOf = {ClientQuestionResponse.class, SupplierRequestResponse.class}
            ))
    ))
    public ResponseEntity<List<AppealResponse>> getAll() {
        return ResponseEntity.ok(service.get());
    }
    @PostMapping("/questions")
    public ResponseEntity<ClientQuestionResponse> createQuestion(@Valid  @RequestBody ClientQuestionCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createQuestion(req));
    }
    @PostMapping("/supplier-requests")
    public ResponseEntity<SupplierRequestResponse> createSupplierRequest(@Valid @RequestBody SupplierRequestCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createSupplierRequest(req));
    }
    @PatchMapping("/{id}/status")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(
            oneOf = {ClientQuestionResponse.class, SupplierRequestResponse.class}
    )))
    public ResponseEntity<AppealResponse> updateStatus(@PathVariable UUID id, @Valid @RequestBody AppealUpdateDto req) {
        return ResponseEntity.ok(service.updateStatus(id, req));
    }
}
