import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeToken } from './utils/jwt';
import { authKey } from './constants/auth.constant';

const AuthRoutes = ['/login', '/register', '/forgot-password'];
const commonPrivateRoutes = [
    '/dashboard',
    '/dashboard/profile',
    '/dashboard/profile/edit',
    '/dashboard/change-password',
    '/video',
];
const roleBasedPrivateRoutes = {
    PATIENT: [/^\/dashboard\/patient/],
    DOCTOR: [/^\/dashboard\/doctor/],
    ADMIN: [/^\/dashboard\/admin/],
    SUPER_ADMIN: [/^\/dashboard\/super-admin/],
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get(authKey)?.value;
    const user = decodeToken(token);

    if (!user) {
        if (AuthRoutes.includes(pathname)) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (user.role === 'SUPER_ADMIN' && pathname === '/dashboard/profile/edit') {
        return NextResponse.redirect(
            new URL('/dashboard/profile', request.url),
        );
    }

    // common privet routes
    if (commonPrivateRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // role based routes
    const routes = roleBasedPrivateRoutes[user.role];
    if (routes && routes.some((route) => pathname.match(route))) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
    matcher: [
        '/login',
        '/video',
        '/register',
        '/forgot-password',
        '/dashboard/:page*',
    ],
};
