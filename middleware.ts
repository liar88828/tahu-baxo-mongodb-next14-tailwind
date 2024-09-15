import { NextRequest, NextResponse } from "next/server";
import { protectedRoutes, publicRoutes } from "@/server/middleware/baseRoute";
import { productMiddleWare } from "@/server/middleware/productMiddleWare";
import { decryptMiddleware } from "@/server/service/auth/jose.service";
import { trolleyMiddleware } from "@/server/middleware/trolleyMiddleware";
import { getSession } from "@/server/api/authCookie";

export default async function middleware(req: NextRequest) {
	// 2. Check if the current route is protected or public
	const path = req.nextUrl.pathname
	const test = req.nextUrl.href
	const isProtectedRoute = protectedRoutes.includes(path)
	const isPublicRoute = publicRoutes.includes(path)
	
	// 3. Decrypt the session from the cookie
	const cookie = await getSession()
	
	const session = await decryptMiddleware(cookie)
	// if (session !== null) {
	// 	const payload = await updateSession()
	// 	console.log(payload, 'payload')
	// }
	// console.log(session,` ${path} session----------xxx-`)
	// 5. Redirect to /login if the user is not authenticated
	if (isProtectedRoute && !session) {
		console.log('will redirect')
		return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
	}
	
	// 6. Redirect to /dashboard if the user is authenticated
	if (
		isPublicRoute &&
		session &&
		!req.nextUrl.pathname.startsWith('/home')
	) {
		return NextResponse.redirect(new URL('/home', req.nextUrl))
	}
	
	// console.log(publicRoutes && session)
	// if(publicRoutes&& session){
	// 	return NextResponse.redirect(new URL('/home', req.nextUrl))
	//
	// }
	//
	// console.log(req.nextUrl.pathname)
	if (req.nextUrl.pathname.startsWith('/product')) {
		return productMiddleWare(req)
	}
	
	if (req.nextUrl.pathname.startsWith('/trolley')) {
		return trolleyMiddleware(req)
	}
	if (req.nextUrl.pathname.startsWith('/api')) {
		if (!req.nextUrl.pathname.startsWith('/api/user')) {
			// console.log('will update session')
			// const payload = await updateSession(cookie)
			// console.log(payload, 'payload')
		}
		
		// console.log('middleware api-------')
		// return trolleyMiddleware(req)
	}
	
	return NextResponse.next()
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|.*\\.png$).*)',
		'/api/:path*',
	
	],
	
}

