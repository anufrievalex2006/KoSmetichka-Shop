import { AxiosError } from "axios";

export class ApiError extends Error {
    constructor(public status: number, message: string, public payload?: unknown) {
        super(message);
        this.name = "ApiError";
    }
}

export function normalize(error: unknown): ApiError {
    if (error instanceof AxiosError) {
        const status = error.response?.status ?? 0;
        const payload = error.response?.data;
        const msg = payload && typeof payload === "object" && "message" in payload
            ? String((payload as { message: unknown }).message)
            : error.message;
        return new ApiError(status, msg, payload);
    }
    return new ApiError(0, "Unknown error", error);
}