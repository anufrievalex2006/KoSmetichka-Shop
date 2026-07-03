import { AppealDto, AppealUpdateDto, ClientQuestionCreateDto, ClientQuestionDto, IAppealRepo, SupplierRequestCreateDto, SupplierRequestDto } from "@/domain";
import { api } from "../api/axiosInstance";

export class AppealRepo implements IAppealRepo {
    async getAll(): Promise<AppealDto[]> {
        const res = await api.get<AppealDto[]>("/appeals");
        return res.data;
    }
    async createClientQuestion(req: ClientQuestionCreateDto): Promise<ClientQuestionDto> {
        const res = await api.post<ClientQuestionDto>("/appeals/questions", req);
        return res.data;
    }
    async createSupplierRequest(req: SupplierRequestCreateDto): Promise<SupplierRequestDto> {
        const res = await api.post<SupplierRequestDto>("/appeals/supplier-requests", req);
        return res.data;
    }
    async updateStatus(id: string, req: AppealUpdateDto): Promise<AppealDto> {
        const res = await api.patch<AppealDto>(`/appeals/${id}/status`, req);
        return res.data;
    }
}