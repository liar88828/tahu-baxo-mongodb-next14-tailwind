import NextAuth from 'next-auth/next'

import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
	type JWT = User //{ role: string }
}

declare module 'next-auth' {
	// interface User {
	// 	// role: string
	// 	id: string
	// }

	// interface JWT {
	// 	token: {
	// 		role: string
	// 	}
	// }

	interface Session {
		user: User & {
			role: string
			accessToken: string
		}
		// token: {
		// 	role: string
		// }
	}
}
