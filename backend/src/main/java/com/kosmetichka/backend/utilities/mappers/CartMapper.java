package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.responses.CartResponse;
import com.kosmetichka.backend.models.api.Cart;
import org.mapstruct.*;

import java.math.BigDecimal;

@Mapper(componentModel = "spring", uses = {CartPositionMapper.class})
public interface CartMapper {
    CartResponse toResponse(Cart c);

    @AfterMapping
    default void calculateTotal(@MappingTarget CartResponse res) {
        if (res.getPositions() == null) return;

        BigDecimal total = res.getPositions().stream()
                .map(p -> p.getPrice().multiply(BigDecimal.valueOf(p.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        res.setTotal(total);
    }
}
