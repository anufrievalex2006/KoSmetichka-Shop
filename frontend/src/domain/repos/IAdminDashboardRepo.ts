import { AdminDashboardDto } from "../dto/adminDashboard";

export interface IAdminDashboardRepo {
    get(): Promise<AdminDashboardDto>;
}