import type { components } from "@/shared/api/schema";

export type CartDto = components["schemas"]["CartResponse"];

export type CartPositionDto = components["schemas"]["CartPositionResponse"];
export type CartPositionCreateDto = components["schemas"]["CartPositionCreateDto"];
export type CartPositionUpdateDto = components["schemas"]["CartPositionUpdateDto"];