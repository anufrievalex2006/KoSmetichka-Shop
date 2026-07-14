package com.kosmetichka.backend.dtos.requests.filter;

import com.kosmetichka.backend.models.api.AttributeValue;
import com.kosmetichka.backend.models.api.Product;
import jakarta.persistence.criteria.*;
import org.hibernate.query.criteria.HibernateCriteriaBuilder;
import org.hibernate.query.criteria.JpaExpression;
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
                f.getAttributes().forEach((id, filter) -> {
                    Join<Product, AttributeValue> avJoin = r.join("attributeValues");
                    Predicate match = cb.equal(avJoin.get("attribute").get("id"), id);

                    Predicate valueMatch;
                    if (filter.getValue() != null && !filter.getValue().isBlank())
                        valueMatch = cb.equal(avJoin.get("value"), filter.getValue());
                    else {
                        HibernateCriteriaBuilder hcb = (HibernateCriteriaBuilder) cb;
                        Expression<Double> asDouble = hcb.cast((JpaExpression<?>) avJoin.get("value"), Double.class);
                        if (filter.getMin() != null && filter.getMax() != null)
                            valueMatch = cb.between(asDouble, Double.parseDouble(filter.getMin()), Double.parseDouble(filter.getMax()));
                        else if (filter.getMin() != null)
                            valueMatch = cb.ge(asDouble, Double.parseDouble(filter.getMin()));
                        else if (filter.getMax() != null)
                            valueMatch = cb.le(asDouble, Double.parseDouble(filter.getMax()));
                        else return;
                    }
                    preds.add(cb.and(match, valueMatch));
                });
            }
            return cb.and(preds.toArray(new Predicate[0]));
        };
    }
}
