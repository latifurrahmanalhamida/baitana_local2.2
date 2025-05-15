import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request) {
    const token = request.cookies.get('access_token')?.value;

    const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};