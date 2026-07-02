package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.AttributeCreateDto;
import com.kosmetichka.backend.dtos.requests.update.AttributeUpdateDto;
import com.kosmetichka.backend.dtos.responses.AttributeResponse;
import com.kosmetichka.backend.models.api.Attribute;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface AttributeMapper {
    AttributeResponse toResponse(Attribute a);
    @Mapping(target = "category.id", source = "categoryId")
    Attribute toEntity(AttributeCreateDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(AttributeUpdateDto req, @MappingTarget Attribute a);
}
