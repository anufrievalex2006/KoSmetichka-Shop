"use client";

import { ProductFilterParams } from "@/domain";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SetStateAction, useCallback, useMemo } from "react";

const ATTR_PREFIX = "attr_";
const SEPARATOR = "|";

export const useProductFilters = () => {
    const nav = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const filters: ProductFilterParams = useMemo(() => {
        const attrs: Record<string, string> = {};
        searchParams.forEach((v,k) => {
            if (k.startsWith(ATTR_PREFIX)) {
                attrs[k.slice(ATTR_PREFIX.length)] = v;
            }
        });

        return {
            search: searchParams.get("search") || undefined,
            brandId: searchParams.get("brandId") || undefined,
            minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
            maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
            page: parseInt(searchParams.get("page") || "0"),
            size: parseInt(searchParams.get("size") || "10"),
            sort: searchParams.get("sort")?.split(SEPARATOR) ?? ["name,asc"],
            attributes: Object.keys(attrs).length ? attrs : undefined
        };
    }, [searchParams]);
    const setFilters = useCallback((
        updater: SetStateAction<Partial<ProductFilterParams>>
    ) => {
        const prev = filters, next = typeof updater === "function" ? updater(prev) : {...prev, ...updater};

        const params = new URLSearchParams(searchParams.toString());
        if ("attributes" in next) {
            Array.from(params.keys())
                .filter(k => k.startsWith(ATTR_PREFIX))
                .forEach(k => params.delete(k));
            Object.entries(next.attributes ?? {}).forEach(([attrId, value]) => {
                if (value)
                    params.set(`${ATTR_PREFIX}${attrId}`, value);
            });
        }
        Object.entries(next).forEach(([k,v]) => {
            if (k === "attributes") return;
            if (v === undefined || v === null || v === "")
                params.delete(k);
            else if (k === "sort" && Array.isArray(v))
                params.set(k, v.join(SEPARATOR));
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