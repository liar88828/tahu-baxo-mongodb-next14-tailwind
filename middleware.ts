import { JWT } from 'next-auth/jwt'
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
	function middleware(req: NextRequestWithAuth) {
		// console.log(req.nextUrl.pathname)
		// console.log(req?.nextauth.token?.role)
		if (
			req.nextUrl.pathname.startsWith('/createUser') &&
			req.nextauth.token?.role !== 'admin'
		) {
			return NextResponse.rewrite(new URL('/denied', req.url))
		}
		if (
			req.nextUrl.pathname.startsWith('/admin') //&&
			// req.nextauth.token?.role !== 'admin'
		) {
			return NextResponse.rewrite(new URL('/denied', req.url))
		}
	},
	{
		callbacks: {
			authorized: ({ req, token }: { token: JWT | null; req: any }) => {
				// console.log(req)
				// console.log(token)
				if (req.nextUrl.pathname.startsWith('/adminxxx')) {
					return token.role === 'adminxxx'
				}
				return !!token // will remove token
			},
		},
	},
)
export const config = {
	matcher: [ '/',
		//'/profile',
		'/admin:path*' ]
}
