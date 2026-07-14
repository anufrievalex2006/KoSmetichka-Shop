import { AttributeCreateDto, AttributeDto, AttributeUpdateDto, IAttributeRepo } from "@/domain";
import { api } from "../api/axiosInstance";

export class AttributeRepo implements IAttributeRepo {
    async getByCategory(categoryId: string): Promise<AttributeDto[]> {
        const res = await api.get<AttributeDto[]>(`/attributes/category/${categoryId}`);
        return res.data;
    }
    async create(req: AttributeCreateDto): Promise<AttributeDto> {
        const res = await api.post<AttributeDto>("/attributes", req);
        return res.data;
    }
    async update(id: string, req: AttributeUpdateDto): Promise<AttributeDto> {
        const res = await api.patch<AttributeDto>(`/attributes/${id}`, req);
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/attributes/${id}`);
    }
}