import { ContentCardCreateDto, ContentCardDto, ContentCardType, ContentCardUpdateDto, IContentCardRepo } from "@/domain";
import { api } from "../api/axiosInstance";

export class ContentCardRepo implements IContentCardRepo {
    async getAll(type?: ContentCardType): Promise<ContentCardDto[]> {
        const res = await api.get<ContentCardDto[]>('/content', {params: {type}});
        return res.data;
    }
    async getById(id: string): Promise<ContentCardDto> {
        const res = await api.get<ContentCardDto>(`/content/${id}`);
        return res.data;
    }
    async create(req: ContentCardCreateDto): Promise<ContentCardDto> {
        const res = await api.post<ContentCardDto>('/content', req);
        return res.data;
    }
    async update(id: string, req: ContentCardUpdateDto): Promise<ContentCardDto> {
        const res = await api.patch<ContentCardDto>(`/content/${id}`, req);
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/content/${id}`);
    }
}