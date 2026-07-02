package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.ContentCardCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ContentCardUpdateDto;
import com.kosmetichka.backend.dtos.responses.ContentCardResponse;
import com.kosmetichka.backend.models.api.ContentCard;
import com.kosmetichka.backend.models.enums.ContentType;
import com.kosmetichka.backend.repos.ContentCardRepo;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.ContentCardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContentCardService {
    private final ContentCardRepo repo;
    private final ContentCardMapper mapper;

    public List<ContentCardResponse> get() {
        return repo.findAll().stream().map(mapper::toResponse).toList();
    }
    public ContentCardResponse getById(UUID id) {
        return mapper.toResponse(repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Карточка с контентом не найдена")));
    }
    public List<ContentCardResponse> getByType(ContentType type) {
        return repo.findByType(type).stream().map(mapper::toResponse).toList();
    }
    public ContentCardResponse create(ContentCardCreateDto req) {
        return mapper.toResponse(repo.save(mapper.toEntity(req)));
    }
    public ContentCardResponse update(UUID id, ContentCardUpdateDto req) {
        ContentCard c = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Карточка с контентом не найдена"));
        mapper.updateEntity(req, c);
        return mapper.toResponse(repo.save(c));
    }
    public void delete(UUID id) {
        if (!repo.existsById(id))
            throw new NotFoundException("Карточка с контентом не найдена");
        repo.deleteById(id);
    }
}
