package com.kosmetichka.backend.dtos.requests.filter;

import com.kosmetichka.backend.models.api.AttributeValue;
import com.kosmetichka.backend.models.api.Product;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class ProductSpecification {
    public static Specification<Product> withFilter(ProductFilterDto f) {
        return (r, q, cb) -> {
            List<Predicate> preds = new ArrayList<>();
            if (f.getSearch() != null && !f.getSearch().isBlank()) {
                String pattern = "%" + f.getSearch().toLowerCase() + "%";
                preds.add(cb.or(
                        cb.like(cb.lower(r.get("name")), pattern),
                        cb.like(cb.lower(r.get("article")), pattern)
                ));
            }
            if (f.getCategoryId() != null) {
                preds.add(cb.equal(r.get("category").get("id"), f.getCategoryId()));
            }
            if (f.getBrandId() != null) {
                preds.add(cb.equal(r.get("brand").get("id"), f.getBrandId()));
            }
            if (f.getMinPrice() != null) {
                preds.add(cb.greaterThanOrEqualTo(r.get("price"), f.getMinPrice()));
            }
            if (f.getMaxPrice() != null) {
                preds.add(cb.lessThanOrEqualTo(r.get("price"), f.getMaxPrice()));
            }
            if (f.getAttributes() != null && !f.getAttributes().isEmpty()) {
                for (Map.Entry<UUID, String> entry: f.getAttributes().entrySet()) {
                    Subquery<UUID> sq = q.subquery(UUID.class);
                    Root<AttributeValue> avRoot = sq.from(AttributeValue.class);
                    sq.select(avRoot.get("product").get("id"))
                            .where(
                                    cb.equal(avRoot.get("attribute").get("id"), entry.getKey()),
                                    cb.equal(avRoot.get("value"), entry.getValue())
                            );
                    preds.add(cb.in(r.get("id")).value(sq));
                }
            }
            return cb.and(preds.toArray(new Predicate[0]));
        };
    }
}
