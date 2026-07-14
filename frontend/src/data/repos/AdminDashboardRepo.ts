import { AdminDashboardDto } from "@/domain/dto/adminDashboard";
import { IAdminDashboardRepo } from "@/domain/repos/IAdminDashboardRepo";
import { api } from "../api/axiosInstance";

export class AdminDashboardRepo implements IAdminDashboardRepo {
    async get(): Promise<AdminDashboardDto> {
        const res = await api.get<AdminDashboardDto>("/admin/dashboard/count");
        return res.data;
    }
}