import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from "../dto/user";

export interface IAuthRepo {
    register(req: RegisterDto): Promise<void>;
    login(req: LoginDto): Promise<void>;
    refresh(): Promise<void>;
    logout(): Promise<void>;
    forgotPassword(req: ForgotPasswordDto): Promise<void>;
    resetPassword(req: ResetPasswordDto): Promise<void>;
}