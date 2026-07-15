import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { clearAuthCookies, setAuthCookies } from '../authCookies';
import { SERVER_API_URL } from '@/shared/api/serverApiUrl';

interface RefreshResponse {
    accessToken?: string;
    refreshToken?: string;
}

export async function POST() {
    const store = await cookies();
    const rtoken = store.get('refreshToken')?.value;
    if (!rtoken) {
        return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    const rememberMe = store.get('remember-me')?.value === '1';
    try {
        const res = await fetch(`${SERVER_API_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: rtoken }),
        });

        const data = (await res.json()) as RefreshResponse;
        if (!res.ok || !data.accessToken || !data.refreshToken) {
            await clearAuthCookies();
            return NextResponse.json(
                data ?? { message: 'Refresh failed' },
                { status: res.ok ? 500 : res.status }
            );
        }

        await setAuthCookies(
            { accessToken: data.accessToken, refreshToken: data.refreshToken },
            rememberMe
        );
        return NextResponse.json({ accessToken: data.accessToken });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Refresh failed' }, { status: 500 });
    }
}