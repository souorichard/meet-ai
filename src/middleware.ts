import { headers } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { getUrl } from './utils/get-url'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if ((pathname === '/sign-in' || pathname === '/sign-up') && session) {
    return NextResponse.redirect(new URL(getUrl('/')))
  }

  if (pathname !== '/sign-in' && pathname !== '/sign-up' && !session) {
    return NextResponse.redirect(new URL(getUrl('/sign-in')))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
