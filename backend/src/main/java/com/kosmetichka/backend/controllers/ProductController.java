package com.kosmetichka.backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kosmetichka.backend.dtos.requests.create.ProductCreateDto;
import com.kosmetichka.backend.dtos.requests.filter.ProductFilterDto;
import com.kosmetichka.backend.dtos.requests.update.ProductUpdateDto;
import com.kosmetichka.backend.dtos.responses.PageResponse;
import com.kosmetichka.backend.dtos.responses.ProductResponse;
import com.kosmetichka.backend.services.ProductService;
import com.kosmetichka.backend.utilities.exceptions.BadRequestException;
import io.swagger.v3.oas.annotations.tags.Tag;
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
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Tag(name = "Товары", description = "Управление товарами (CRUD с фильтрацией, пагинацией и сортировкой)")
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService service;
    private static final ObjectMapper mapper = new ObjectMapper();

    @GetMapping
    public ResponseEntity<PageResponse<ProductResponse>> getAll(
            @RequestParam(required = false)String search,
            @RequestParam(required = false)UUID categoryId,
            @RequestParam(required = false)UUID brandId,
            @RequestParam(required = false)BigDecimal minPrice,
            @RequestParam(required = false)BigDecimal maxPrice,
            @RequestParam(required = false) String attributes,
            @ParameterObject @PageableDefault(size = 20) @SortDefault(sort = "name")Pageable pageable
    ) {
        ProductFilterDto f = ProductFilterDto.builder()
                .search(search)
                .categoryId(categoryId)
                .brandId(brandId)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .attributes(parse(attributes))
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

    private Map<UUID, String> parse(String raw) {
        if (raw == null || raw.isBlank())
            return null;

        Map<String, String> res;
        try {
            res = mapper.readValue(raw, new TypeReference<Map<String, String>>() {});
        } catch (JsonProcessingException e) {
            throw new BadRequestException("Некорректный формат фильтра по атрибутам");
        }
        return res.entrySet().stream().collect(Collectors.toMap(
                e -> {
                    try {
                        return UUID.fromString(e.getKey());
                    }
                    catch (IllegalArgumentException ex) {
                        throw new BadRequestException("Некорректный идентификатор атрибута в фильтре");
                    }
                }, Map.Entry::getValue
        ));
    }
}
