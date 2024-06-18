import { NextResponse, NextRequest } from 'next/server'
import { locales } from 'app/[locale]/i18n/settings'
import { fallbackLng } from 'app/[locale]/i18n/locales'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(new URL(`/${fallbackLng}${pathname}`, request.url))
  }

  // Check if there is any supported locale in the pathname
  const isDefaultLocalePath = pathname.startsWith(`/${fallbackLng}/`) || pathname === `/${fallbackLng}`

  if (isDefaultLocalePath) {
    return NextResponse.redirect(
      new URL(
        pathname.replace(`/${fallbackLng}`, pathname === `/${fallbackLng}` ? '/' : ''),
        request.url
      )
    )
  }

  // Ensure the root paths for locales (e.g., /fr, /en) are valid and do not return not found
  const isLocaleRootPath = locales.some(locale => pathname === `/${locale}`)

  if (isLocaleRootPath) {
    return NextResponse.next()
  }

  // Check if the path is unmatched (i.e., not found)
  const isUnmatchedPath = !locales.some(locale => pathname.startsWith(`/${locale}/`))

  if (isUnmatchedPath) {
    // Rewrite to the custom not found page
    return NextResponse.rewrite(new URL(`/${fallbackLng}/not-found`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|static|track|data|css|scripts|.*\\..*|_next).*|sitemap.xml)',
}
