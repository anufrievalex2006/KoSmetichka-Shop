import type { components } from "@/shared/api/schema";

export type ProductDto = components["schemas"]["ProductResponse"];
export type ProductDtoPagedList = components["schemas"]["PageResponseProductResponse"];
export type ProductCreateDto = components["schemas"]["ProductCreateDto"];
export type ProductUpdateDto = components["schemas"]["ProductUpdateDto"];