package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.ClientQuestionCreateDto;
import com.kosmetichka.backend.dtos.requests.create.SupplierRequestCreateDto;
import com.kosmetichka.backend.dtos.requests.update.AppealUpdateDto;
import com.kosmetichka.backend.dtos.responses.AppealResponse;
import com.kosmetichka.backend.models.api.Appeal;
import com.kosmetichka.backend.models.api.ClientQuestion;
import com.kosmetichka.backend.models.api.SupplierRequest;
import com.kosmetichka.backend.models.enums.AppealStatus;
import com.kosmetichka.backend.repos.AppealRepo;
import com.kosmetichka.backend.repos.ClientQuestionRepo;
import com.kosmetichka.backend.repos.SupplierRequestRepo;
import com.kosmetichka.backend.utilities.exceptions.BadRequestException;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.AppealMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppealService {
    private final ClientQuestionRepo questionRepo;
    private final SupplierRequestRepo supplierRepo;
    private final AppealRepo repo;
    private final AppealMapper mapper;

    public List<AppealResponse> get() {
        return repo.findAll().stream().map(a -> {
            if (a instanceof ClientQuestion q)
                return mapper.toResponse(q);
            if (a instanceof SupplierRequest r)
                return mapper.toResponse(r);
            throw new BadRequestException("Неизвестный тип обращения");
        }).toList();
    }
    public AppealResponse createQuestion(ClientQuestionCreateDto req) {
        ClientQuestion q = mapper.toEntity(req);
        q.setStatus(AppealStatus.NEW);
        return mapper.toResponse(questionRepo.save(q));
    }
    public AppealResponse createSupplierRequest(SupplierRequestCreateDto req) {
        SupplierRequest r = mapper.toEntity(req);
        r.setStatus(AppealStatus.NEW);
        return mapper.toResponse(supplierRepo.save(r));
    }
    public AppealResponse updateStatus(UUID id, AppealUpdateDto req) {
        Appeal a = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Обращение не найдено"));
        mapper.updateEntity(req, a);
        a = repo.save(a);
        if (a instanceof ClientQuestion q)
            return mapper.toResponse(q);
        if (a instanceof SupplierRequest r)
            return mapper.toResponse(r);
        throw new BadRequestException("Неизвестный тип обращения");
    }
}
