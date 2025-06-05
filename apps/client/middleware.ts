import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

// Modify to the current paths
const protectedPaths = [
  /\/payment-method/,
  /\/profile/,
  /\/user\/(.*)/,
  /\/admin/,
  /\/owner/,
];

const adminPaths = [/\/admin/];
const ownerPaths = [/\/owner/];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = protectedPaths.some(path => path.test(pathname));

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (adminPaths.some(path => path.test(pathname))) {
    if (session.user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }
  if (ownerPaths.some(path => path.test(pathname))) {
    if (session.user.role !== 'OWNER') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();

  /*
  const token =
    req.headers.get('authorization')?.split(' ')[1] ||
    req.cookies.get('jwt')?.value;
  console.log('TOKEN', token);

  if (token) {
    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1/';

      const res = await fetch(`${apiBaseUrl}auth/verify`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
      const data = await res.json();
      console.log(data);
      const user = await data.data.currentUser;
      console.log(user);

      if (pathname.startsWith('/admin') && user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
      if (pathname.startsWith('/owner') && user.role !== 'OWNER') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error('Middleware authentication error:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }*/
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|signup|public).*)',
  ],
};
