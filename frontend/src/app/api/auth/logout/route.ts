import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { API_URL } from '@/shared/api/api';
import { clearAuthCookies } from '../authCookies';

export async function POST() {
    const store = await cookies();
    const atoken = store.get('accessToken')?.value;

    if (atoken) {
        try {
            await fetch(`${API_URL}/api/auth/logout`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${atoken}` },
            });
        } catch (e) {
            console.error(e);
        }
    }

    await clearAuthCookies();
    return NextResponse.json({ success: true });
}