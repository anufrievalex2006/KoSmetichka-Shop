package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.ShopContactCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ShopContactUpdateDto;
import com.kosmetichka.backend.dtos.responses.ShopContactResponse;
import com.kosmetichka.backend.models.api.Shop;
import com.kosmetichka.backend.models.api.ShopContact;
import com.kosmetichka.backend.repos.ShopContactRepo;
import com.kosmetichka.backend.repos.ShopRepo;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.ShopContactMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContactService {
    private final ShopRepo shopRepo;
    private final ShopContactRepo repo;
    private final ShopContactMapper mapper;

    public List<ShopContactResponse> get() {
        return repo.findAll().stream().map(mapper::toResponse).toList();
    }
    public ShopContactResponse getById(UUID id) {
        return mapper.toResponse(repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Контакт не найден")));
    }
    public ShopContactResponse create(ShopContactCreateDto req) {
        Shop s = shopRepo.findById(req.getShopId())
                .orElseThrow(() -> new NotFoundException("Магазин не найден"));
        ShopContact c = mapper.toEntity(req);
        c.setShop(s);
        return mapper.toResponse(repo.save(c));
    }
    public ShopContactResponse update(UUID id, ShopContactUpdateDto req) {
        ShopContact c = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Контакт не найден"));
        mapper.updateEntity(req, c);
        return mapper.toResponse(repo.save(c));
    }
    public void delete(UUID id) {
        if (!repo.existsById(id))
            throw new NotFoundException("Контакт не найден");
        repo.deleteById(id);
    }
}
