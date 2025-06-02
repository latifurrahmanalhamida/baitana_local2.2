import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request) {
    const cookieStore = cookies();
    const token = cookieStore.get('access_token')?.value;

    const isLoginRoute = request.nextUrl.pathname === '/auth/login';
    const isRegisterRoute = request.nextUrl.pathname === '/auth/register';
    const isAuthRoute = isLoginRoute || isRegisterRoute;

    const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') ||
        request.nextUrl.pathname.startsWith('/master');

    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/master/:path*',
        '/auth/login',
        '/auth/register',
    ],
};