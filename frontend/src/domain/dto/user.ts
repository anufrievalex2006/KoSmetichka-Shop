import type { components } from "@/shared/api/schema";

export type ProfileDto = components["schemas"]["UserResponse"];
export type ProfileUpdateDto = components["schemas"]["UserUpdateDto"];

export type LoginDto = components["schemas"]["LoginDto"];
export type RegisterDto = components["schemas"]["RegisterDto"];
export type TokenResponse = components["schemas"]["AuthResponse"];

export type ResetPasswordDto = components["schemas"]["ResetPasswordDto"];
export type ForgotPasswordDto = components["schemas"]["ForgotPasswordDto"];
export type PasswordUpdateDto = components["schemas"]["PasswordUpdateDto"];

export type UserRole = "ADMIN" | "CREATOR" | "CLIENT" | "SUPPLIER";
export type UserRoleUpdateDto = components["schemas"]["UserRoleUpdateDto"];