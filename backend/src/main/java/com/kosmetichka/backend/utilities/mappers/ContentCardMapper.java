package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.ContentCardCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ContentCardUpdateDto;
import com.kosmetichka.backend.dtos.responses.ContentCardResponse;
import com.kosmetichka.backend.models.api.ContentCard;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ContentCardMapper {
    ContentCardResponse toResponse(ContentCard card);
    ContentCard toEntity(ContentCardCreateDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(ContentCardUpdateDto req, @MappingTarget ContentCard card);
}
