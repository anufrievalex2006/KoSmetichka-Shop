import { ProductCreateDto, ProductDto, ProductDtoPagedList, ProductFilterParams, ProductUpdateDto } from "../dto/product";

export interface IProductRepo {
    getAll(params?: ProductFilterParams): Promise<ProductDtoPagedList>;
    getById(id: string): Promise<ProductDto>;
    create(req: ProductCreateDto): Promise<ProductDto>;
    update(id: string, req: ProductUpdateDto): Promise<ProductDto>;
    delete(id: string): Promise<void>;
}