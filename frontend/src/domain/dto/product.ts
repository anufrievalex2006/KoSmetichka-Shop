import type { components } from "@/shared/api/schema";

export type ProductDto = components["schemas"]["ProductResponse"];
export type ProductDtoPagedList = components["schemas"]["PageResponseProductResponse"];
export type ProductCreateDto = components["schemas"]["ProductCreateDto"];
export type ProductUpdateDto = components["schemas"]["ProductUpdateDto"];

export interface ProductFilterParams {
    search?: string;
    categoryId?: string;
    brandId?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    size?: number;
    sort?: string[];
    attributes?: Record<string, string>;
}