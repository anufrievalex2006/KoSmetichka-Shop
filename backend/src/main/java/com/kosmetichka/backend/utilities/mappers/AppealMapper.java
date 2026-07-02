package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.ClientQuestionCreateDto;
import com.kosmetichka.backend.dtos.requests.create.SupplierRequestCreateDto;
import com.kosmetichka.backend.dtos.requests.update.AppealUpdateDto;
import com.kosmetichka.backend.dtos.responses.ClientQuestionResponse;
import com.kosmetichka.backend.dtos.responses.SupplierRequestResponse;
import com.kosmetichka.backend.models.api.Appeal;
import com.kosmetichka.backend.models.api.ClientQuestion;
import com.kosmetichka.backend.models.api.SupplierRequest;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface AppealMapper {
    @Mapping(target = "appealType", constant = "CLIENT_QUESTION")
    ClientQuestionResponse toResponse(ClientQuestion q);
    @Mapping(target = "appealType", constant = "SUPPLIER_REQUEST")
    SupplierRequestResponse toResponse(SupplierRequest req);
    ClientQuestion toEntity(ClientQuestionCreateDto req);
    SupplierRequest toEntity(SupplierRequestCreateDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(AppealUpdateDto req, @MappingTarget Appeal a);
}
