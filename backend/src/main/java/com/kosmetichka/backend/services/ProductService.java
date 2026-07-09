package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.AttributeValueCreateDto;
import com.kosmetichka.backend.dtos.requests.create.ProductCreateDto;
import com.kosmetichka.backend.dtos.requests.filter.ProductFilterDto;
import com.kosmetichka.backend.dtos.requests.filter.ProductSpecification;
import com.kosmetichka.backend.dtos.requests.update.ProductUpdateDto;
import com.kosmetichka.backend.dtos.responses.PageResponse;
import com.kosmetichka.backend.dtos.responses.ProductResponse;
import com.kosmetichka.backend.models.api.Attribute;
import com.kosmetichka.backend.models.api.AttributeValue;
import com.kosmetichka.backend.models.api.Product;
import com.kosmetichka.backend.repos.AttributeRepo;
import com.kosmetichka.backend.repos.BrandRepo;
import com.kosmetichka.backend.repos.CategoryRepo;
import com.kosmetichka.backend.repos.ProductRepo;
import com.kosmetichka.backend.utilities.exceptions.BadRequestException;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepo repo;
    private final ProductMapper mapper;
    private final CategoryRepo cRepo;
    private final BrandRepo bRepo;
    private final AttributeRepo aRepo;

    public PageResponse<ProductResponse> get(ProductFilterDto f, Pageable pageable) {
        Page<Product> page = repo.findAll(ProductSpecification.withFilter(f), pageable);
        return PageResponse.from(page.map(mapper::toResponse));
    }
    public ProductResponse getById(UUID id) {
        return mapper.toResponse(repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Товар не найден")));
    }
    public ProductResponse create(ProductCreateDto req) {
        Product p = mapper.toEntity(req);
        p.setCategory(cRepo.findById(req.getCategoryId())
                .orElseThrow(() -> new NotFoundException("Категория не найдена")));
        p.setBrand(bRepo.findById(req.getBrandId())
                .orElseThrow(() -> new NotFoundException("Производитель не найден")));
        p.getAttributeValues().addAll(buildAttributeValues(req.getAttributeValues(), p));
        return mapper.toResponse(repo.save(p));
    }
    public ProductResponse update(UUID id, ProductUpdateDto req) {
        Product product = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Товар не найден"));
        mapper.updateEntity(req, product);
        if (req.getCategoryId() != null)
            product.setCategory(cRepo.findById(req.getCategoryId())
                    .orElseThrow(() -> new NotFoundException("Категория не найдена")));
        if (req.getBrandId() != null)
            product.setBrand(bRepo.findById(req.getBrandId())
                    .orElseThrow(() -> new NotFoundException("Производитель не найден")));

        if (req.getAttributeValues() != null) {
            product.getAttributeValues().clear();
            product.getAttributeValues().addAll(buildAttributeValues(req.getAttributeValues(), product));
        }
        return mapper.toResponse(repo.save(product));
    }
    public void delete(UUID id) {
        if (!repo.existsById(id))
            throw new NotFoundException("Товар не найден");
        repo.deleteById(id);
    }

    private List<AttributeValue> buildAttributeValues(List<AttributeValueCreateDto> dtos, Product product) {
        return dtos.stream().map(dto -> {
            Attribute attribute = aRepo.findById(dto.getAttributeId())
                    .orElseThrow(() -> new NotFoundException("Атрибут не найден"));
            validateValue(attribute, dto.getValue());
            return AttributeValue.builder()
                    .value(dto.getValue())
                    .product(product)
                    .attribute(attribute)
                    .build();
        }).toList();
    }

    private void validateValue(Attribute attribute, String value) {
        switch (attribute.getType()) {
            case INT -> {
                try {
                    Integer.parseInt(value);
                } catch (NumberFormatException e) {
                    throw new BadRequestException("Значение атрибута \"%s\" должно быть целым числом".formatted(attribute.getName()));
                }
            }
            case FLOAT -> {
                try {
                    Double.parseDouble(value);
                } catch (NumberFormatException e) {
                    throw new BadRequestException("Значение атрибута \"%s\" должно быть числом".formatted(attribute.getName()));
                }
            }
            case ENUM -> {
                if (!attribute.getEnumValues().contains(value))
                    throw new BadRequestException("Недопустимое значение атрибута \"%s\"".formatted(attribute.getName()));
            }
            case TEXT -> { /* любой непустой текст, уже провалидирован @NotBlank в DTO */ }
        }
    }
}
