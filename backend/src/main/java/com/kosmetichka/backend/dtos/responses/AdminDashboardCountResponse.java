package com.kosmetichka.backend.dtos.responses;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminDashboardCountResponse {
    private Long newAppealsCount;
    private Long brandsCount;
    private Long categoriesCount;
    private Long newsCount;
    private Long promotionsCount;
    private Long productsCount;
    private Long usersCount;
}
