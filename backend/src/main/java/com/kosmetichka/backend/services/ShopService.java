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

    public ShopResponse get() {
        Shop s = getShop();
        return mapper.toResponse(s);
    }
    public ShopResponse update(ShopUpdateDto req) {
        Shop s = getShop();
        mapper.updateEntity(req, s);
        return mapper.toResponse(repo.save(s));
    }
    private Shop getShop() {
        List<Shop> shops = repo.findAll();
        if (shops.isEmpty()) {
            Shop s = Shop.builder()
                    .name("КоSметичка")
                    .address("г. Томск, пер. Карповский, д. 12")
                    .build();
            return repo.save(s);
        }
        return shops.getFirst();
    }
}
