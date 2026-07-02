package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.CategoryCreateDto;
import com.kosmetichka.backend.dtos.requests.update.CategoryUpdateDto;
import com.kosmetichka.backend.dtos.responses.CategoryResponse;
import com.kosmetichka.backend.models.api.Category;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {AttributeMapper.class})
public interface CategoryMapper {
    CategoryResponse toResponse(Category c);
    Category toEntity(CategoryCreateDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(CategoryUpdateDto req, @MappingTarget Category c);
}
