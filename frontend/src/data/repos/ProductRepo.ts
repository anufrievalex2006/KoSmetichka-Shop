import { IProductRepo, ProductCreateDto, ProductDto, ProductDtoPagedList, ProductFilterParams, ProductUpdateDto } from "@/domain";
import { api } from "../api/axiosInstance";

export class ProductRepo implements IProductRepo {
    async getAll(params?: ProductFilterParams): Promise<ProductDtoPagedList> {
        const res = await api.get<ProductDtoPagedList>('/products', { params });
        return res.data;
    }
    async getById(id: string): Promise<ProductDto> {
        const res = await api.get<ProductDto>(`/products/${id}`);
        return res.data;
    }
    async create(req: ProductCreateDto): Promise<ProductDto> {
        const res = await api.post<ProductDto>('/products', req);
        return res.data;
    }
    async update(id: string, req: ProductUpdateDto): Promise<ProductDto> {
        const res = await api.patch<ProductDto>(`/products/${id}`, req);
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/products/${id}`);
    }
}