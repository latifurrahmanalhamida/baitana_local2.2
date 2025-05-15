import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request) {
    const token = cookies().get('access_token')?.value;
    const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');
    const isMastersRoute = request.nextUrl.pathname.startsWith('/masters');

    // Perbaiki kondisi logika di sini
    if ((isDashboardRoute || isMastersRoute) && !token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/masters/:path*',
    ],
};
