package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.BrandCreateDto;
import com.kosmetichka.backend.dtos.requests.update.BrandUpdateDto;
import com.kosmetichka.backend.dtos.responses.BrandResponse;
import com.kosmetichka.backend.models.api.Brand;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface BrandMapper {
    BrandResponse toResponse(Brand b);
    Brand toEntity(BrandCreateDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(BrandUpdateDto req, @MappingTarget Brand b);
}
