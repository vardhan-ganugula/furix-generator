import { NextResponse,NextRequest } from 'next/server'


const publicURLs = [
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/',
    '/api/v1/login',
    '/api/v1/signup',
    '/api/v1/forgot-password',
    '/api/v1/reset-password',
    '/api/v1/verify-email',
    '/verify-email',
    '/api/v1/verify-email',
    '/send-verification-email',
    '/api/v1/send-verification-email',
    
]


export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies?.get('token')?.value || '';
  if (token && publicURLs.includes(path)) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl));
  }

  if(!token && !publicURLs.includes(path)) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
      ],
}