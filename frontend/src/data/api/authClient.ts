import { normalize } from "@/shared/utils/normalizeError";
import axios from "axios";

export const authClient = axios.create({
    baseURL: "/api/auth",
    withCredentials: true
});

authClient.interceptors.response.use(
    res => res,
    error => Promise.reject(normalize(error))
);