import { AttributeCreateDto, AttributeDto, AttributeUpdateDto } from "../dto/attribute";

export interface IAttributeRepo {
    getByCategory(categoryId: string): Promise<AttributeDto[]>;
    create(req: AttributeCreateDto): Promise<AttributeDto>;
    update(id: string, req: AttributeUpdateDto): Promise<AttributeDto>;
    delete(id: string): Promise<void>;
}