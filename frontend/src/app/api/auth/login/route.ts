import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/shared/api/api';
import { setAuthCookies } from '../authCookies';

interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

interface LoginResponse {
    accessToken?: string;
    refreshToken?: string;
    message?: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as LoginRequest;
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = (await res.json()) as LoginResponse;
        if (!res.ok || !data.accessToken || !data.refreshToken) {
            return NextResponse.json(
                data.message ? data : { message: 'Неверный email или пароль' },
                { status: res.ok ? 400 : res.status }
            );
        }

        await setAuthCookies(
            { accessToken: data.accessToken, refreshToken: data.refreshToken },
            Boolean(body.rememberMe)
        );
        return NextResponse.json({ success: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}