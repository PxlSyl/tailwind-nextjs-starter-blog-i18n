import { NextResponse, NextRequest } from 'next/server'
import { locales } from 'app/[locale]/i18n/settings'
import { fallbackLng, secondLng } from 'app/[locale]/i18n/locales'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const url = request.nextUrl

  // Ensure the root paths for locales (e.g., /fr, /en) are valid and do not return not found
  if (locales.some(locale => pathname === `/${locale}`)) {
    return NextResponse.next()
  }

  const isLocalePath = locales.some(locale => pathname.startsWith(`/${locale}/`))
  const isDefaultLocalePath = pathname.startsWith(`/${fallbackLng}/`) || pathname === `/${fallbackLng}`

  if (isDefaultLocalePath) {
    return NextResponse.redirect(
      new URL(
        pathname.replace(`/${fallbackLng}`, pathname === `/${fallbackLng}` ? '/' : ''),
        request.url
      )
    )
  }

  if (pathname === '/') {
    // If the root path is requested, do not rewrite it, just proceed
    return NextResponse.next()
  }

  if (!isLocalePath) {
    // Rewrite paths that are missing a locale
    return NextResponse.rewrite(new URL(`/${fallbackLng}${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|static|track|data|css|scripts|.*\\..*|_next).*|sitemap.xml)',
}
