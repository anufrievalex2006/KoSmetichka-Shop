import { ShopContactCreateDto, ShopContactDto, ShopContactUpdateDto } from "../dto/shopContact";

export interface IContactsRepo {
    getAll(): Promise<ShopContactDto[]>;
    getById(id: string): Promise<ShopContactDto>;
    create(req: ShopContactCreateDto): Promise<ShopContactDto>;
    update(id: string, req: ShopContactUpdateDto): Promise<ShopContactDto>;
    delete(id: string): Promise<void>;
}