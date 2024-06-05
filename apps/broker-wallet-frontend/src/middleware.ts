import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const v4cookie = cookies().get('v4company.token');

  if (!v4cookie) {
    if (request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (v4cookie) {
    const decodedToken: JwtPayload = jwt.decode(v4cookie.value) as JwtPayload;

    if (decodedToken && decodedToken.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      const expirationTime = decodedToken.exp;

      const isValid = currentTime < expirationTime;

      if (isValid) {
        return NextResponse.next();
      }
    }
  }
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
