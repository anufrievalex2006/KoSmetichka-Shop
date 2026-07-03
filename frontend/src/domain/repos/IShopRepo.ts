import { ShopCreateDto, ShopDto, ShopUpdateDto } from "../dto/shop";

export interface IShopRepo {
    getAll(): Promise<ShopDto[]>;
    getById(id: string): Promise<ShopDto>;
    create(req: ShopCreateDto): Promise<ShopDto>;
    update(id: string, req: ShopUpdateDto): Promise<ShopDto>;
    delete(id: string): Promise<void>;
}