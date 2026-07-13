"use client";

import { AttributeFilterValue, ProductFilterParams } from "@/domain";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SetStateAction, useCallback, useMemo } from "react";

export const useProductFilters = () => {
    const nav = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const filters: ProductFilterParams = useMemo(() => {
        const raw = searchParams.get("attributes");
        let attrs: Record<string, AttributeFilterValue> | undefined;
        if (raw) {
            try {
                attrs = JSON.parse(raw);
            }
            catch {
                attrs = undefined;
            }
        }

        return {
            search: searchParams.get("search") || undefined,
            brandId: searchParams.get("brandId") || undefined,
            minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
            maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
            page: parseInt(searchParams.get("page") || "0"),
            size: parseInt(searchParams.get("size") || "10"),
            sort: searchParams.get("sort")?.split("|") ?? ["name,asc"],
            attributes: attrs
        };
    }, [searchParams]);
    const setFilters = useCallback((
        updater: SetStateAction<Partial<ProductFilterParams>>
    ) => {
        const prev = filters, next = typeof updater === "function" ? updater(prev) : {...prev, ...updater};

        const params = new URLSearchParams(searchParams.toString());
        if ("attributes" in next) {
            const hasAttrs = next.attributes && Object.keys(next.attributes).length > 0;
            if (hasAttrs)
                params.set("attributes", JSON.stringify(next.attributes));
            else params.delete("attributes");
        }
        Object.entries(next).forEach(([k,v]) => {
            if (k === "attributes") return;
            if (v === undefined || v === null || v === "")
                params.delete(k);
            else if (k === "sort" && Array.isArray(v))
                params.set(k, v.join("|"));
            else
                params.set(k, String(v));
        });
        nav.replace(`${pathname}?${params.toString()}`, {
            scroll: false
        });
    }, [nav, pathname, searchParams, filters]);

    return {
        filters,
        setFilters
    };
}