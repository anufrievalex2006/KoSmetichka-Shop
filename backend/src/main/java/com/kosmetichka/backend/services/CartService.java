package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.CartPositionCreateDto;
import com.kosmetichka.backend.dtos.requests.update.CartPositionUpdateDto;
import com.kosmetichka.backend.dtos.responses.CartResponse;
import com.kosmetichka.backend.models.api.Cart;
import com.kosmetichka.backend.models.api.CartPosition;
import com.kosmetichka.backend.models.api.Product;
import com.kosmetichka.backend.repos.CartPositionRepo;
import com.kosmetichka.backend.repos.CartRepo;
import com.kosmetichka.backend.repos.ProductRepo;
import com.kosmetichka.backend.security.UserPrincipal;
import com.kosmetichka.backend.utilities.exceptions.ForbiddenException;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.CartMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepo repo;
    private final CartPositionRepo posRepo;
    private final ProductRepo pRepo;
    private final CartMapper mapper;

    public CartResponse getCart(UserPrincipal p) {
        Cart c = repo.findByUserId(p.getId())
                .orElseThrow(() -> new NotFoundException("Корзина не найдена"));
        return mapper.toResponse(c);
    }
    public CartResponse addPosition(UserPrincipal pr, CartPositionCreateDto req) {
        Cart c = repo.findByUserId(pr.getId())
                .orElseThrow(() -> new NotFoundException("Корзина не найдена"));
        Product p = pRepo.findById(req.getProductId())
                .orElseThrow(() -> new NotFoundException("Товар не найден"));

        c.getPositions().stream()
                .filter(x -> x.getProduct().getId().equals(p.getId()))
                .findFirst()
                .ifPresentOrElse(
                        existing -> existing.setQuantity(existing.getQuantity() + req.getQuantity()),
                        () -> c.getPositions().add(CartPosition.builder()
                                        .cart(c)
                                        .product(p)
                                        .quantity(req.getQuantity())
                                        .price(p.getPrice())
                                .build())
                );
        return mapper.toResponse(repo.save(c));
    }
    public CartResponse updatePosition(UserPrincipal pr, UUID posId, CartPositionUpdateDto req) {
        CartPosition p = posRepo.findById(posId)
                .orElseThrow(() -> new NotFoundException("Позиция корзины не найдена"));
        if (!p.getCart().getUser().getId().equals(pr.getId()))
            throw new ForbiddenException("У вас нет прав на обновление позиции в корзине");
        p.setQuantity(req.getQuantity());
        posRepo.save(p);
        return getCart(pr);
    }
    public CartResponse deletePosition(UserPrincipal pr, UUID posId) {
        CartPosition p = posRepo.findById(posId)
                .orElseThrow(() -> new NotFoundException("Позиция корзины не найдена"));
        if (!p.getCart().getUser().getId().equals(pr.getId()))
            throw new ForbiddenException("У вас нет прав на удаление товара из корзины");
        posRepo.delete(p);
        return getCart(pr);
    }
    public void clearCart(UserPrincipal pr) {
        Cart c = repo.findByUserId(pr.getId())
                .orElseThrow(() -> new NotFoundException("Корзина не найдена"));
        c.getPositions().clear();
        repo.save(c);
    }
}
