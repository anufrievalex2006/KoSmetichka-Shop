package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.ShopCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ShopUpdateDto;
import com.kosmetichka.backend.dtos.responses.ShopResponse;
import com.kosmetichka.backend.models.api.Shop;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {ShopContactMapper.class})
public interface ShopMapper {
    ShopResponse toResponse(Shop s);
    Shop toEntity(ShopCreateDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(ShopUpdateDto req, @MappingTarget Shop s);
}
