package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.ProductCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ProductUpdateDto;
import com.kosmetichka.backend.dtos.responses.ProductResponse;
import com.kosmetichka.backend.models.api.Product;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CategoryMapper.class, BrandMapper.class, AttributeValueMapper.class})
public interface ProductMapper {
    ProductResponse toResponse(Product p);
    @Mapping(target = "category.id", source = "categoryId")
    @Mapping(target = "brand.id", source = "brandId")
    @Mapping(target = "attributeValues", ignore = true)
    Product toEntity(ProductCreateDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "attributeValues", ignore = true)
    void updateEntity(ProductUpdateDto req, @MappingTarget Product p);
}
