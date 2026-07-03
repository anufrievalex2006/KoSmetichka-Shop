import { CartDto, CartPositionCreateDto, CartPositionUpdateDto, ICartRepo } from "@/domain";
import { api } from "../api/axiosInstance";

export class CartRepo implements ICartRepo {
    async getCart(): Promise<CartDto> {
        const res = await api.get<CartDto>("/cart");
        return res.data;
    }
    async addPosition(req: CartPositionCreateDto): Promise<CartDto> {
        const res = await api.post<CartDto>("/cart/positions", req);
        return res.data;
    }
    async updatePosition(id: string, req: CartPositionUpdateDto): Promise<CartDto> {
        const res = await api.patch<CartDto>(`/cart/positions/${id}`, req);
        return res.data;
    }
    async deletePosition(id: string): Promise<CartDto> {
        const res = await api.delete<CartDto>(`/cart/positions/${id}`);
        return res.data;
    }
    async clearCart(): Promise<void> {
        await api.delete("/cart");
    }
}