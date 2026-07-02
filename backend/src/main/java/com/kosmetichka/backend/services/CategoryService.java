package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.CategoryCreateDto;
import com.kosmetichka.backend.dtos.requests.update.CategoryUpdateDto;
import com.kosmetichka.backend.dtos.responses.CategoryResponse;
import com.kosmetichka.backend.models.api.Category;
import com.kosmetichka.backend.repos.CategoryRepo;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.CategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepo repo;
    private final CategoryMapper mapper;

    public List<CategoryResponse> get() {
        return repo.findAll().stream().map(mapper::toResponse).toList();
    }
    public CategoryResponse getById(UUID id) {
        return mapper.toResponse(repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Категория не найдена")));
    }
    public CategoryResponse create(CategoryCreateDto req) {
        return mapper.toResponse(repo.save(mapper.toEntity(req)));
    }
    public CategoryResponse update(UUID id, CategoryUpdateDto req) {
        Category c = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Категория не найдена"));
        mapper.updateEntity(req, c);
        return mapper.toResponse(repo.save(c));
    }
    public void delete(UUID id) {
        if (!repo.existsById(id))
            throw new NotFoundException("Категория не найдена");
        repo.deleteById(id);
    }
}
