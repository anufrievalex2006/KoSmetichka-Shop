package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.ProductCreateDto;
import com.kosmetichka.backend.dtos.requests.filter.ProductFilterDto;
import com.kosmetichka.backend.dtos.requests.update.ProductUpdateDto;
import com.kosmetichka.backend.dtos.responses.PageResponse;
import com.kosmetichka.backend.dtos.responses.ProductResponse;
import com.kosmetichka.backend.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService service;

    @GetMapping
    public ResponseEntity<PageResponse<ProductResponse>> getAll(
            @RequestParam(required = false)String search,
            @RequestParam(required = false)UUID categoryId,
            @RequestParam(required = false)UUID brandId,
            @RequestParam(required = false)BigDecimal minPrice,
            @RequestParam(required = false)BigDecimal maxPrice,
            @ParameterObject @PageableDefault(size = 20) @SortDefault(sort = "name")Pageable pageable
    ) {
        ProductFilterDto f = ProductFilterDto.builder()
                .search(search)
                .categoryId(categoryId)
                .brandId(brandId)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .build();
        return ResponseEntity.ok(service.get(f, pageable));
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.getById(id));
    }
    @PostMapping
    public ResponseEntity<ProductResponse> create(@Valid @RequestBody ProductCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }
    @PatchMapping("/{id}")
    public ResponseEntity<ProductResponse> update(@PathVariable UUID id, @Valid @RequestBody ProductUpdateDto req) {
        return ResponseEntity.ok(service.update(id, req));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
