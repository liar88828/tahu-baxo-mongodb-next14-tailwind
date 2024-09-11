import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { protectedRoutes, publicRoutes } from "@/server/middleware/baseRoute";
import { productMiddleWare } from "@/server/middleware/productMiddleWare";
import { decrypt } from "@/server/service/auth/jose.service";
import { trolleyMiddleware } from "@/server/middleware/trolleyMiddleware";

export default async function middleware(req: NextRequest) {
	// 2. Check if the current route is protected or public
	const path = req.nextUrl.pathname
	const test = req.nextUrl.href
	const isProtectedRoute = protectedRoutes.includes(path)
	const isPublicRoute = publicRoutes.includes(path)
	
	// 3. Decrypt the session from the cookie
	const cookie = cookies().get('access')?.value
	const session = await decrypt(cookie)
	// console.log(cookie,'cookies')
	console.log(session, 'session')
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
	
	return NextResponse.next()
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|.*\\.png$).*)',
		// '/api/:path*',
	
	],
	
}

