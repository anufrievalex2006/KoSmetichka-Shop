import { IAdminDashboardRepo } from "@/domain/repos/IAdminDashboardRepo";
import { useQuery } from "@tanstack/react-query";

export const useDashboardStats = (
    adminRepo: IAdminDashboardRepo
) => {
    const {data: counts, isLoading} = useQuery({
        queryKey: ["counts"],
        queryFn: async () => {
            const res = await adminRepo.get();
            return res;
        }
    });

    return {
        data: counts,
        isLoading
    }
}