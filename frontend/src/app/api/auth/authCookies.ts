import { cookies } from 'next/headers';

interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

const isProd = process.env.NODE_ENV === 'production';

export async function setAuthCookies(
    { accessToken, refreshToken }: TokenPair,
    rememberMe: boolean
) {
    const store = await cookies();
    const persistOptions = rememberMe ? { maxAge: 30 * 24 * 60 * 60 } : {};

    store.set('accessToken', accessToken, {
        path: '/',
        maxAge: 15 * 60,
        httpOnly: false,
        secure: isProd,
        sameSite: 'strict',
    });

    store.set('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: isProd,
        sameSite: 'strict',
        ...persistOptions,
    });

    store.set('remember-me', rememberMe ? '1' : '0', {
        path: '/',
        httpOnly: false,
        secure: isProd,
        sameSite: 'strict',
        ...persistOptions,
    });
}

export async function clearAuthCookies() {
    const store = await cookies();

    store.delete('accessToken');
    store.delete('refreshToken');
    store.delete('remember-me');
}
