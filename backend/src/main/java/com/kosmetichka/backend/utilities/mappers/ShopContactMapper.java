package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.ShopContactCreateDto;
import com.kosmetichka.backend.dtos.responses.ShopContactResponse;
import com.kosmetichka.backend.models.api.ShopContact;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ShopContactMapper {
    ShopContactResponse toResponse(ShopContact contact);
    ShopContact toEntity(ShopContactCreateDto req);
}
