package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.responses.CartPositionResponse;
import com.kosmetichka.backend.models.api.CartPosition;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface CartPositionMapper {
    CartPositionResponse toResponse(CartPosition pos);
}
