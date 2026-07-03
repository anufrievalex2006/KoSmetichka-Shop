import { API_URL } from "@/shared/api/api";
import { NextRequest, NextResponse } from "next/server";
import { setAuthCookies } from "../authCookies";

interface RegisterResponse {
    accessToken?: string;
    refreshToken?: string;
    message?: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const res = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = (await res.json()) as RegisterResponse;
        if (!res.ok || !data.accessToken || !data.refreshToken) {
            return NextResponse.json(data || {
                message: "Register failed"
            }, {
                status: res.ok ? 400 : res.status
            });
        }

        await setAuthCookies({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        }, false);
        return NextResponse.json({
            success: true
        });
    }
    catch (e) {
        console.error(e);
        return NextResponse.json({
            message: "Internal server error"
        }, {
            status: 500
        });
    }
}