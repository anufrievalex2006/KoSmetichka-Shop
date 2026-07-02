package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.RegisterDto;
import com.kosmetichka.backend.dtos.requests.update.UserUpdateDto;
import com.kosmetichka.backend.dtos.responses.UserResponse;
import com.kosmetichka.backend.models.api.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toResponse(User u);
    User toEntity(RegisterDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(UserUpdateDto req, @MappingTarget User u);
}
