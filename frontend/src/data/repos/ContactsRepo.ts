import { ShopContactDto, ShopContactCreateDto, ShopContactUpdateDto } from "@/domain";
import { IContactsRepo } from "@/domain/repos/IContactsRepo";
import { api } from "../api/axiosInstance";

export class ContactsRepo implements IContactsRepo {
    async getAll(): Promise<ShopContactDto[]> {
        const res = await api.get<ShopContactDto[]>("/shop/contacts");
        return res.data;
    }
    async getById(id: string): Promise<ShopContactDto> {
        const res = await api.get<ShopContactDto>(`/shop/contacts/${id}`);
        return res.data;
    }
    async create(req: ShopContactCreateDto): Promise<ShopContactDto> {
        const res = await api.post<ShopContactDto>("/shop/contacts", req);
        return res.data;
    }
    async update(id: string, req: ShopContactUpdateDto): Promise<ShopContactDto> {
        const res = await api.patch<ShopContactDto>(`/shop/contacts/${id}`, req);
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/shop/contacts/${id}`);
    }
}