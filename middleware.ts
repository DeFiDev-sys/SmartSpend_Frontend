import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_ROUTES = ['/admin', '/users-dashboard', '/user-profile'];
const PUBLIC_ROUTES = ['/', '/login', '/register'];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;
  
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname.startsWith(route)
  );
  
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (isPublicRoute && token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);

      return NextResponse.redirect(new URL('/users-dashboard', req.nextUrl));
    } catch (error) {
      console.error('Invalid token:', error);
      const response = NextResponse.redirect(new URL(pathname, req.nextUrl));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}