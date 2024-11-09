export const config = {
  url : 'http://localhost:3000'
}

export const configAuth = {
  matcher: ['/',
    // '/login',
    '/delivery/:path*',
    '/orderan/:path*',
    '/table/:path*',
    '/bank/:path*',
    '/product/:path*',
    '/admin/:path*'
  ]
}

export const ROOT = '/';
export const LOGIN = '/login';
export const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/products',
  '/api/auth/callback/google',
  '/api/auth/callback/github',
]

export const DEFAULT_REDIRECT = '/protected';
export const PROTECTED_SUB_ROUTES = [
  '/checkout',
]
