import { IUserRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useRegistrationStats = (repo: IUserRepo) => {
    const {data: stats, isLoading} = useQuery({
        queryKey: ["stats", "registrations"],
        queryFn: async () => {
            const res = await repo.getStatistics();
            return res;
        }
    });

    return {
        stats,
        isLoading
    };
}