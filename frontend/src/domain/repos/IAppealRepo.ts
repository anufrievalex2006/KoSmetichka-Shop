import { AppealDto, ClientQuestionCreateDto, ClientQuestionDto, SupplierRequestCreateDto, SupplierRequestDto, AppealUpdateDto } from "../dto/appeal";

export interface IAppealRepo {
    getAll(): Promise<AppealDto[]>;
    createClientQuestion(req: ClientQuestionCreateDto): Promise<ClientQuestionDto>;
    createSupplierRequest(req: SupplierRequestCreateDto): Promise<SupplierRequestDto>;
    updateStatus(id: string, req: AppealUpdateDto): Promise<AppealDto>;
}