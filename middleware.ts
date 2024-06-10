// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest, response: NextResponse) {
    const userSession = request.cookies.get('userSession')
    // If no userSession, redirect to login
    if (!userSession) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/cart'], // paths to apply the middleware
}


