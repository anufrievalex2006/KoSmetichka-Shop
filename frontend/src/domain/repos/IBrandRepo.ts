import { BrandCreateDto, BrandDto, BrandUpdateDto } from "../dto/brand";

export interface IBrandRepo {
    getAll(): Promise<BrandDto[]>;
    getById(id: string): Promise<BrandDto>;
    create(req: BrandCreateDto): Promise<BrandDto>;
    update(id: string, req: BrandUpdateDto): Promise<BrandDto>;
    delete(id: string): Promise<void>;
}