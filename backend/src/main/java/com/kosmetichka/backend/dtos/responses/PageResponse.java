package com.kosmetichka.backend.dtos.responses;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PageResponse<T> {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<T> content;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int page;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int size;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private long totalElements;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private int totalPages;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private boolean last;

    public static <T> PageResponse<T> from(Page<T> page) {
        return PageResponse.<T>builder()
                .content(page.getContent())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .build();
    }
}
