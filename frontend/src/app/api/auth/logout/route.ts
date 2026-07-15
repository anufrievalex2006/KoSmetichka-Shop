import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { clearAuthCookies } from '../authCookies';
import { SERVER_API_URL } from '@/shared/api/serverApiUrl';

export async function POST() {
    const store = await cookies();
    const atoken = store.get('accessToken')?.value;

    if (atoken) {
        try {
            await fetch(`${SERVER_API_URL}/auth/logout`, {
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