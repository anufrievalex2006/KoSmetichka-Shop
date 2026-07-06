import { StatisticsDto } from "../dto/statistics";
import { PasswordUpdateDto, ProfileDto, ProfileUpdateDto } from "../dto/user";

export interface IUserRepo {
    getProfile(): Promise<ProfileDto>;
    updateProfile(req: ProfileUpdateDto): Promise<ProfileDto>;
    updateAvatar(file: File): Promise<ProfileDto>;
    changePassword(req: PasswordUpdateDto): Promise<void>;
    getStatistics(): Promise<StatisticsDto[]>;

    getAll(): Promise<ProfileDto[]>;
    delete(id: string): Promise<void>;
}