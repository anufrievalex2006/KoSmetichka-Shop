import { ForgotPasswordDto, IAuthRepo, LoginDto, RegisterDto, ResetPasswordDto } from "@/domain";
import { authClient } from "../api/authClient";

export class AuthRepo implements IAuthRepo {
    async register(req: RegisterDto): Promise<void> {
        await authClient.post("/register", req);
    }
    async login(req: LoginDto): Promise<void> {
        await authClient.post("/login", req);
    }
    async refresh(): Promise<void> {
        await authClient.post("/refresh");
    }
    async logout(): Promise<void> {
        await authClient.post("/logout");
    }
    async forgotPassword(req: ForgotPasswordDto): Promise<void> {
        await authClient.post("/password/forgot", req);
    }
    async resetPassword(req: ResetPasswordDto): Promise<void> {
        await authClient.post("/password/reset", req);
    }
}