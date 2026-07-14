import { ShopDto, ShopUpdateDto } from "../dto/shop";

export interface IShopRepo {
    get(): Promise<ShopDto>;
    update(req: ShopUpdateDto): Promise<ShopDto>;
}