package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.CartPositionCreateDto;
import com.kosmetichka.backend.dtos.requests.update.CartPositionUpdateDto;
import com.kosmetichka.backend.dtos.responses.CartResponse;
import com.kosmetichka.backend.models.api.Cart;
import com.kosmetichka.backend.models.api.CartPosition;
import com.kosmetichka.backend.models.api.Product;
import com.kosmetichka.backend.models.api.User;
import com.kosmetichka.backend.repos.CartPositionRepo;
import com.kosmetichka.backend.repos.CartRepo;
import com.kosmetichka.backend.repos.ProductRepo;
import com.kosmetichka.backend.security.UserPrincipal;
import com.kosmetichka.backend.utilities.exceptions.BadRequestException;
import com.kosmetichka.backend.utilities.exceptions.ForbiddenException;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.CartMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {
    private final CartRepo repo;
    private final CartPositionRepo posRepo;
    private final ProductRepo pRepo;
    private final CartMapper mapper;
    private final EmailService service;

    @Transactional(readOnly = true)
    public CartResponse getCart(UserPrincipal p) {
        Cart c = repo.findByUserId(p.getId())
                .orElseThrow(() -> new NotFoundException("Корзина не найдена"));
        return mapper.toResponse(c);
    }
    public void checkout(UserPrincipal pr) {
        Cart c = repo.findByUserId(pr.getId())
                .orElseThrow(() -> new NotFoundException("Корзина не найдена"));
        if (c.getPositions().isEmpty())
            throw new BadRequestException("Корзина пуста");

        BigDecimal total = c.getPositions().stream()
                .map(p -> p.getPrice().multiply(BigDecimal.valueOf(p.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        User u = pr.getUser();
        service.sendOrderReport(u.getEmail(), u.getName(), c.getPositions(), total);
        c.getPositions().clear();
        repo.save(c);
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
        Cart c = repo.findByUserId(pr.getId())
                .orElseThrow(() -> new NotFoundException("Корзина не найдена"));
        CartPosition p = c.getPositions().stream()
                .filter(x -> x.getId().equals(posId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Позиция корзины не найдена"));

        c.getPositions().remove(p);
        repo.save(c);
        return mapper.toResponse(c);
    }
    public void clearCart(UserPrincipal pr) {
        Cart c = repo.findByUserId(pr.getId())
                .orElseThrow(() -> new NotFoundException("Корзина не найдена"));
        c.getPositions().clear();
        repo.save(c);
    }
}
