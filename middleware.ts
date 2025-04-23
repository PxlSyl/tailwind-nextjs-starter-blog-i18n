import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
