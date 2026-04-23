import { NextResponse, type NextRequest } from 'next/server';

const COOKIE_NAME = 'lc_session';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  // Simple check: if cookie exists and looks like a JWT (3 parts), consider authenticated.
  // Full verification happens in the API routes/server components.
  let isAuthenticated = false;
  if (token) {
    const parts = token.split('.');
    if (parts.length === 3) {
      try {
        // Decode the payload to check expiry (no signature verification needed in dev middleware)
        const payload = JSON.parse(atob(parts[1]));
        if (payload.exp && payload.exp > Date.now() / 1000) {
          isAuthenticated = true;
        } else if (!payload.exp) {
          isAuthenticated = true;
        }
      } catch {
        isAuthenticated = false;
      }
    }
  }

  // Public paths
  const publicPaths = ['/login', '/reset-password'];
  const isPublic = publicPaths.includes(request.nextUrl.pathname);
  const isApi = request.nextUrl.pathname.startsWith('/api/');

  // Allow API routes through (they handle their own auth)
  if (isApi) return NextResponse.next();

  if (isPublic) {
    if (isAuthenticated && request.nextUrl.pathname === '/login') {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
