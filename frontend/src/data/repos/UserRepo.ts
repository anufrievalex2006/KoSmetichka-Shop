import { IUserRepo, PasswordUpdateDto, ProfileDto, ProfileUpdateDto, StatisticsDto } from "@/domain";
import { api } from "../api/axiosInstance";

export class UserRepo implements IUserRepo {
    async getProfile(): Promise<ProfileDto> {
        const res = await api.get<ProfileDto>("/users/me");
        return res.data;
    }
    async updateProfile(req: ProfileUpdateDto): Promise<ProfileDto> {
        const res = await api.patch<ProfileDto>("/users/me", req);
        return res.data;
    }
    async changePassword(req: PasswordUpdateDto): Promise<void> {
        await api.patch("/users/me/password", req);
    }
    async getStatistics(): Promise<StatisticsDto[]> {
        const res = await api.get<StatisticsDto[]>("/users/statistics");
        return res.data;
    }
    async getAll(): Promise<ProfileDto[]> {
        const res = await api.get<ProfileDto[]>("/users");
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/users/${id}`);
    }
}