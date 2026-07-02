package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.AttributeCreateDto;
import com.kosmetichka.backend.dtos.requests.update.AttributeUpdateDto;
import com.kosmetichka.backend.dtos.responses.AttributeResponse;
import com.kosmetichka.backend.models.api.Attribute;
import com.kosmetichka.backend.models.api.Category;
import com.kosmetichka.backend.repos.AttributeRepo;
import com.kosmetichka.backend.repos.CategoryRepo;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.AttributeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AttributeService {
    private final AttributeRepo repo;
    private final CategoryRepo cRepo;
    private final AttributeMapper mapper;

    public List<AttributeResponse> getByCategory(UUID id) {
        return repo.findByCategoryId(id).stream().map(mapper::toResponse).toList();
    }
    public AttributeResponse create(AttributeCreateDto req) {
        Attribute a = mapper.toEntity(req);
        Category c = cRepo.findById(req.getCategoryId())
                .orElseThrow(() -> new NotFoundException("Категория не найдена"));
        a.setCategory(c);
        return mapper.toResponse(repo.save(a));
    }
    public AttributeResponse update(UUID id, AttributeUpdateDto req) {
        Attribute a = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Атрибут не найден"));
        mapper.updateEntity(req, a);
        return mapper.toResponse(repo.save(a));
    }
    public void delete(UUID id) {
        if (!repo.existsById(id))
            throw new NotFoundException("Атрибут не найден");
        repo.deleteById(id);
    }
}
