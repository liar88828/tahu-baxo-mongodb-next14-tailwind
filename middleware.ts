import { NextRequest, NextResponse } from "next/server";
import { protectedRoutes, publicRoutes } from "@/server/middleware/baseRoute";
import { productMiddleWare } from "@/server/middleware/productMiddleWare";
import { trolleyMiddleware } from "@/server/middleware/trolleyMiddleware";
import { sessionMiddleware } from "@/server/service/auth/session.service";

export default async function middleware(req: NextRequest) {
	// 2. Check if the current route is protected or public
	const path = req.nextUrl.pathname
	const test = req.nextUrl.href
	const isProtectedRoute = protectedRoutes.includes(path)
	const isPublicRoute = publicRoutes.includes(path)
	
	// 3. Decrypt the session from the cookie
	const session = await sessionMiddleware()
	
	// 5. Redirect to /login if the user is not authenticated
	if (isProtectedRoute && !session) {
		// console.log('will validate refresh token ------------')
		// const refresh = getCookie('refresh')
		// console.log(refresh, ' : refresh will redirect')
		
		// if (!refresh) {
		// 	// console.log(' : refresh token will redirect-------------')
		return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
		// }
	}
	
	if (
		isPublicRoute &&
		session &&
		!req.nextUrl.pathname.startsWith('/home')
	) {
		return NextResponse.redirect(new URL('/home', req.nextUrl))
	}
	
	if (publicRoutes && session) {
		console.log('is public')
		// return NextResponse.redirect(new URL('/home', req.nextUrl))
		
	}
	
	if (req.nextUrl.pathname.startsWith('/profile')) {
		return productMiddleWare(req)
	}
	
	
	if (req.nextUrl.pathname.startsWith('/product')) {
		return productMiddleWare(req)
	}
	
	if (req.nextUrl.pathname.startsWith('/trolley')) {
		return trolleyMiddleware(req)
	}
	
	if (req.nextUrl.pathname.startsWith('/api')) {
		if (!req.nextUrl.pathname.startsWith('/api/user')) {
		}
	}
	
	return NextResponse.next()
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|.*\\.png$).*)',
		'/api/:path*',
	
	],
	
}

