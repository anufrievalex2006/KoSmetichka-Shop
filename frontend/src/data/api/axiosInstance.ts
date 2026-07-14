import { normalize } from "@/shared/utils/normalizeError";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: {
        serialize: (params: Record<string, unknown>) => {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([k,v]) => {
                if (v === undefined || v === null) return;

                if (Array.isArray(v))
                    v.forEach(x => searchParams.append(k, String(x)))   ;
                else
                    searchParams.append(k, String(v));
            });
            return searchParams.toString();
        }
    }
});

api.interceptors.request.use(config => {
    const token = getCookie("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

interface FailedQueueItem {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: Array<FailedQueueItem> = [];

function processQueue(error: unknown, token: string | null = null) {
    failedQueue.forEach(({resolve, reject}) => {
        if (error)
            reject(error);
        else resolve(token!);
    });
    failedQueue = [];
}

api.interceptors.response.use(
    res => res,
    async (error: AxiosError) => {
        const orig = error.config as RetryableConfig | undefined;
        const isAuth = orig?.url?.includes("/auth/");

        if (error.response?.status !== 401 || !orig || orig._retry || isAuth) {
            return Promise.reject(normalize(error));
        }

        if (isRefreshing) {
            orig._retry = true;
            return new Promise<string>((resolve, reject) => {
                failedQueue.push({resolve, reject});
            }).then(token => {
                orig.headers.Authorization = `Bearer ${token}`;
                return api(orig);
            }).catch(e => Promise.reject(normalize(e)));
        }

        orig._retry = true;
        isRefreshing = true;
        try {
            const res = await fetch("/api/auth/refresh", {
                method: "POST"
            });
            if (!res.ok)
                throw new Error("Refresh failed");

            const {accessToken} = (await res.json()) as {accessToken: string};
            orig.headers.Authorization = `Bearer ${accessToken}`;
            processQueue(null, accessToken);
            return api(orig);
        }
        catch (refreshError) {
            processQueue(refreshError);
            return Promise.reject(normalize(refreshError));
        }
        finally {
            isRefreshing = false;
        }
    }
);