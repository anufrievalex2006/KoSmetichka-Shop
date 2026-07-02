package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.AttributeValueCreateDto;
import com.kosmetichka.backend.dtos.requests.update.AttributeValueUpdateDto;
import com.kosmetichka.backend.dtos.responses.AttributeValueResponse;
import com.kosmetichka.backend.models.api.AttributeValue;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {AttributeMapper.class})
public interface AttributeValueMapper {
    AttributeValueResponse toResponse(AttributeValue value);
    @Mapping(target = "attribute.id", source = "attributeId")
    AttributeValue toEntity(AttributeValueCreateDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(AttributeValueUpdateDto req, @MappingTarget AttributeValue value);
}
