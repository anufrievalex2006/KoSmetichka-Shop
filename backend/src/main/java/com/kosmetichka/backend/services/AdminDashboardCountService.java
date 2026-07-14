package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.responses.AdminDashboardCountResponse;
import com.kosmetichka.backend.models.enums.AppealStatus;
import com.kosmetichka.backend.models.enums.ContentType;
import com.kosmetichka.backend.repos.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminDashboardCountService {
    private final AppealRepo appealRepo;
    private final BrandRepo brandRepo;
    private final CategoryRepo categoryRepo;
    private final ContentCardRepo cardRepo;
    private final ProductRepo productRepo;
    private final UserRepo userRepo;

    public AdminDashboardCountResponse get(boolean isAdmin) {
        var builder = AdminDashboardCountResponse.builder()
                .brandsCount(brandRepo.count())
                .categoriesCount(categoryRepo.count())
                .newsCount(cardRepo.countByType(ContentType.NEWS))
                .promotionsCount(cardRepo.countByType(ContentType.PROMO))
                .productsCount(productRepo.count());

        if (isAdmin) {
            builder
                    .newAppealsCount(appealRepo.countByStatus(AppealStatus.NEW))
                    .usersCount(userRepo.count());
        }
        return builder.build();
    }
}
