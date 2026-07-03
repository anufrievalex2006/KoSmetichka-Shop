import { IShopRepo, ShopCreateDto, ShopDto, ShopUpdateDto } from "@/domain";
import { api } from "../api/axiosInstance";

export class ShopRepo implements IShopRepo {
    async getAll(): Promise<ShopDto[]> {
        const res = await api.get<ShopDto[]>('/shops');
        return res.data;
    }
    async getById(id: string): Promise<ShopDto> {
        const res = await api.get<ShopDto>(`/shops/${id}`);
        return res.data;
    }
    async create(req: ShopCreateDto): Promise<ShopDto> {
        const res = await api.post<ShopDto>('/shops', req);
        return res.data;
    }
    async update(id: string, req: ShopUpdateDto): Promise<ShopDto> {
        const res = await api.patch<ShopDto>(`/shops/${id}`, req);
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/shops/${id}`);
    }
}