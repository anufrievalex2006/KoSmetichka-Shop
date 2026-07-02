package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.ShopCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ShopUpdateDto;
import com.kosmetichka.backend.dtos.responses.ShopResponse;
import com.kosmetichka.backend.models.api.Shop;
import com.kosmetichka.backend.repos.ShopRepo;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.ShopMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ShopService {
    private final ShopRepo repo;
    private final ShopMapper mapper;

    public List<ShopResponse> get() {
        return repo.findAll().stream().map(mapper::toResponse).toList();
    }
    public ShopResponse getById(UUID id) {
        return mapper.toResponse(repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Магазин не найден")));
    }
    public ShopResponse create(ShopCreateDto req) {
        return mapper.toResponse(repo.save(mapper.toEntity(req)));
    }
    public ShopResponse update(UUID id, ShopUpdateDto req) {
        Shop s = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Магазин не найден"));
        mapper.updateEntity(req, s);
        return mapper.toResponse(repo.save(s));
    }
    public void delete(UUID id) {
        if (!repo.existsById(id))
            throw new NotFoundException("Магазин не найден");
        repo.deleteById(id);
    }
}
