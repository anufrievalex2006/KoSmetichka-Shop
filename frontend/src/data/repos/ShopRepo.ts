import { IShopRepo, ShopDto, ShopUpdateDto } from "@/domain";
import { api } from "../api/axiosInstance";

export class ShopRepo implements IShopRepo {
    async get(): Promise<ShopDto> {
        const res = await api.get<ShopDto>("/shop");
        return res.data;
    }
    async update(req: ShopUpdateDto): Promise<ShopDto> {
        const res = await api.patch<ShopDto>("/shop", req);
        return res.data;
    }
}