import type { components } from "@/shared/api/schema";

export type ClientQuestionDto = components["schemas"]["ClientQuestionResponse"];
export type ClientQuestionCreateDto = components["schemas"]["ClientQuestionCreateDto"];

export type SupplierRequestDto = components["schemas"]["SupplierRequestResponse"];
export type SupplierRequestCreateDto = components["schemas"]["SupplierRequestCreateDto"];

export type AppealDto = ClientQuestionDto | SupplierRequestDto;
export type AppealUpdateDto = components["schemas"]["AppealUpdateDto"];

export function isClientQuestion(appeal: AppealDto): appeal is ClientQuestionDto {
    return appeal.appealType === "CLIENT_QUESTION";
}