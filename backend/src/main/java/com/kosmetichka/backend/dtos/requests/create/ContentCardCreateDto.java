package com.kosmetichka.backend.dtos.requests.create;

import com.kosmetichka.backend.models.enums.ContentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.validator.constraints.URL;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContentCardCreateDto {
    @NotBlank(message = "Введите заголовок")
    private String title;
    private String description;
    @NotNull(message = "Выберите тип контента")
    private ContentType type;
    @URL(message = "Некорректная ссылка на изображение")
    private String photoUrl;
}
