import { IAppealRepo, IUserRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useDashboardStats = (appealRepo: IAppealRepo, userRepo: IUserRepo) => {
    const {data: appeals, isLoading: areAppealsLoading} = useQuery({
        queryKey: ["appeals"],
        queryFn: async () => {
            const res = await appealRepo.getAll();
            return res;
        }
    });
    const {data: users, isLoading: areUsersLoading} = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await userRepo.getAll();
            return res;
        }
    });

    return {
        newAppealsCount: appeals?.filter(a => a.status === "NEW").length ?? 0,
        usersCount: users?.length ?? 0,
        isLoading: areAppealsLoading || areUsersLoading
    };
}