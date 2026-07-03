import { CategoryCreateDto, CategoryDto, CategoryUpdateDto } from "../dto/category";

export interface ICategoryRepo {
    getAll(): Promise<CategoryDto[]>;
    getById(id: string): Promise<CategoryDto>;
    create(req: CategoryCreateDto): Promise<CategoryDto>;
    update(id: string, req: CategoryUpdateDto): Promise<CategoryDto>;
    delete(id: string): Promise<void>;
}