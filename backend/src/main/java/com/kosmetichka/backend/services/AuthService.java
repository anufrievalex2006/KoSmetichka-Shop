package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.LoginDto;
import com.kosmetichka.backend.dtos.requests.create.RegisterDto;
import com.kosmetichka.backend.dtos.responses.AuthResponse;
import com.kosmetichka.backend.models.api.Cart;
import com.kosmetichka.backend.models.api.User;
import com.kosmetichka.backend.models.enums.UserRole;
import com.kosmetichka.backend.repos.CartRepo;
import com.kosmetichka.backend.repos.UserRepo;
import com.kosmetichka.backend.security.JwtService;
import com.kosmetichka.backend.security.UserPrincipal;
import com.kosmetichka.backend.utilities.exceptions.BadRequestException;
import com.kosmetichka.backend.utilities.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final CartRepo cRepo;
    private final UserRepo repo;
    private final UserMapper mapper;
    private final PasswordEncoder encoder;
    private final JwtService service;
    private final AuthenticationManager authManager;

    public AuthResponse register(RegisterDto req) {
        if (repo.findByEmail(req.getEmail()).isPresent())
            throw new BadRequestException("Пользователь с таким email уже существует");

        User u = mapper.toEntity(req);
        u.setPassword(encoder.encode(req.getPassword()));
        u.setRole(UserRole.CLIENT);
        repo.save(u);
        cRepo.save(Cart.builder().user(u).build());

        UserPrincipal pr = new UserPrincipal(u);
        return AuthResponse.builder()
                .accessToken(service.generateAccessToken(pr))
                .refreshToken(service.generateRefreshToken(pr))
                .build();
    }
    public AuthResponse login(LoginDto req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );
        User u = repo.findByEmail(req.getEmail()).orElseThrow();
        UserPrincipal pr = new UserPrincipal(u);
        return AuthResponse.builder()
                .accessToken(service.generateAccessToken(pr))
                .refreshToken(service.generateRefreshToken(pr))
                .build();
    }
    public AuthResponse refresh(String refreshToken) {
        if (!service.isTokenValid(refreshToken))
            throw new BadRequestException("Некорректный refresh-токен");

        String email = service.extractEmail(refreshToken);
        User u = repo.findByEmail(email).orElseThrow();
        UserPrincipal pr = new UserPrincipal(u);
        return AuthResponse.builder()
                .accessToken(service.generateAccessToken(pr))
                .refreshToken(service.generateRefreshToken(pr))
                .build();
    }
}
