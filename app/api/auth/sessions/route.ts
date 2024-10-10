import { CustomJwtPayload } from '@/app/lib/definitions';
import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    const res = await fetch('http://localhost:5230/api/auth/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const error = await res.json();
        return NextResponse.json({ error: error }, { status: res.status });
    }

    const { accessToken, refreshToken: { token, expirationDate } } = await res.json();
    const decoded = jwtDecode<CustomJwtPayload>(accessToken);

    const response = NextResponse.json(decoded['email']);
    response.cookies.set('access_token', accessToken, {
        expires: new Date(decoded['exp']! * 1000)
    });

    response.cookies.set('refresh_token', token, {
        expires: new Date(expirationDate)
    });

    return response;
}
