import { NextResponse } from 'next/server';

export async function DELETE(request: Request, { params }: { params: { refreshToken: string } }) {
    const { refreshToken } = params;

    try {
        const res = await fetch(`http://localhost:5230/api/auth/tokens/${refreshToken}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to log out' }, { status: res.status });
        }

        return NextResponse.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error);
        return NextResponse.json({ error: 'An error occurred while logging out' }, { status: 500 });
    }
}
