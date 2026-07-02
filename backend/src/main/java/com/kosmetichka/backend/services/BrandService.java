package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.BrandCreateDto;
import com.kosmetichka.backend.dtos.requests.update.BrandUpdateDto;
import com.kosmetichka.backend.dtos.responses.BrandResponse;
import com.kosmetichka.backend.models.api.Brand;
import com.kosmetichka.backend.repos.BrandRepo;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.BrandMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BrandService {
    private final BrandRepo repo;
    private final BrandMapper mapper;

    public List<BrandResponse> get() {
        return repo.findAll().stream().map(mapper::toResponse).toList();
    }
    public BrandResponse getById(UUID id) {
        return mapper.toResponse(repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Производитель не найден")));
    }
    public BrandResponse create(BrandCreateDto req) {
        return mapper.toResponse(repo.save(mapper.toEntity(req)));
    }
    public BrandResponse update(UUID id, BrandUpdateDto req) {
        Brand b = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Производитель не найден"));
        mapper.updateEntity(req, b);
        return mapper.toResponse(repo.save(b));
    }
    public void delete(UUID id) {
        if (!repo.existsById(id))
            throw new NotFoundException("Производитель не найден");
        repo.deleteById(id);
    }
}
