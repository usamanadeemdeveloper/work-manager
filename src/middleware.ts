import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('authToken')?.value;

  if (isPublicPath(pathname)) {
    if (authToken && isAuthOptional(pathname)) {
      return redirectTo('/profile/user', request);
    }
    return NextResponse.next();
  }

  if (isProtectedPath(pathname) && !authToken) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { message: "Access Denied", success: false },
        { status: 401 }
      );
    }
    return redirectTo('/login', request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/add-task',
    '/show-task',
    '/profile/:path*',
    '/api/:path*',
  ],
};

const publicPaths = ['/api/login', '/api/user', '/login', '/signup'];
const protectedPaths = ['/add-task', '/show-task', '/profile'];

const isPublicPath = (pathname: string): boolean => {
  return publicPaths.includes(pathname) || pathname.startsWith('/api') && publicPaths.includes(`/api${pathname.split('/api')[1]}`);
};

const isAuthOptional = (pathname: string): boolean => {
  return publicPaths.includes(pathname);
};

const isProtectedPath = (pathname: string): boolean => {
  return protectedPaths.some(path => pathname.startsWith(path)) || pathname.startsWith('/api') && !publicPaths.includes(`/api${pathname.split('/api')[1]}`);
};

const redirectTo = (url: string, request: NextRequest) => {
  return NextResponse.redirect(new URL(url, request.url));
};
