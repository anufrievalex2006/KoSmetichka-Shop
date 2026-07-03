import { CartDto, CartPositionCreateDto, CartPositionUpdateDto } from "../dto/cart";

export interface ICartRepo {
    getCart(): Promise<CartDto>;
    addPosition(req: CartPositionCreateDto): Promise<CartDto>;
    updatePosition(id: string, req: CartPositionUpdateDto): Promise<CartDto>;
    deletePosition(id: string): Promise<CartDto>;
    clearCart(): Promise<void>;
}