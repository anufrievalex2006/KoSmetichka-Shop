package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.update.PasswordUpdateDto;
import com.kosmetichka.backend.dtos.requests.update.UserUpdateDto;
import com.kosmetichka.backend.dtos.responses.StatisticsResponse;
import com.kosmetichka.backend.dtos.responses.UserResponse;
import com.kosmetichka.backend.models.api.User;
import com.kosmetichka.backend.repos.UserRepo;
import com.kosmetichka.backend.security.UserPrincipal;
import com.kosmetichka.backend.utilities.exceptions.BadRequestException;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo repo;
    private final UserMapper mapper;
    private final PasswordEncoder encoder;

    public List<StatisticsResponse> getStatistics() {
        return repo.countRegistrationsByDay().stream()
                .map(r -> new StatisticsResponse((LocalDate) r[0], (long) r[1]))
                .toList();
    }
    public UserResponse getProfile(UserPrincipal pr) {
        return mapper.toResponse(pr.getUser());
    }
    public UserResponse updateProfile(UserPrincipal pr, UserUpdateDto req) {
        User u = repo.findById(pr.getId())
                .orElseThrow(() -> new NotFoundException("Пользователь не найден"));
        mapper.updateEntity(req, u);
        return mapper.toResponse(repo.save(u));
    }
    public void changePassword(UserPrincipal pr, PasswordUpdateDto req) {
        User u = repo.findById(pr.getId())
                .orElseThrow(() -> new NotFoundException("Пользователь не найден"));
        if (!encoder.matches(req.getOldPassword(), u.getPassword()))
            throw new BadRequestException("Неверный пароль");
        u.setPassword(encoder.encode(req.getNewPassword()));
        repo.save(u);
    }
    public List<UserResponse> get() {
        return repo.findAll().stream().map(mapper::toResponse).toList();
    }
    public void delete(UUID id) {
        if (!repo.existsById(id))
            throw new NotFoundException("Пользователь не найден");
        repo.deleteById(id);
    }
}
