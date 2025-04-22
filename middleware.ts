import { NextResponse, NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createServerSupabaseClient({ req: request, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.redirect(new URL('/admin/login', request.url));
  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
