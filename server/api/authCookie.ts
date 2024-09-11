import { cookies } from "next/headers";
import { AuthCookie, ResponseRegister as ResponseAuthUser } from "@/interface/user/UserPublic";

export function authCookie() {
	const cookieStore = cookies()
	
	const getAccess = () => {
		if (cookieStore.has("access")) {
			const access = cookieStore.get('access')
			return access?.value ?? ''
		}
		return ''
	}
	const getAuth = (): AuthCookie => {
		let refresh = cookieStore.get('refresh')
		let user = cookieStore.get('user')
		
		return {
			accessToken: getAccess(),
			refreshToken: refresh?.value ?? '',
			data: JSON.parse(user?.value ?? '')
		};
	}
	
	const check: Record<keyof AuthCookie, {}> = {
		accessToken: cookieStore.has("access"),
		refreshToken: cookieStore.has("refresh"),
		data: cookieStore.has("user")
	}
	return {
		getAccess: getAccess,
		checkAuth: check,
		getAuth: getAuth,
		setAuth: (data: ResponseAuthUser) => {
			cookieStore.set('access', data.accessToken, { secure: true })
			cookieStore.set('refresh', data.refreshToken.id, { secure: true })
			cookieStore.set('user', JSON.stringify(data.data), { secure: true })
			// cookieStore.set('auth', JSON.stringify(data), { secure: true })
		},
		deleteAuth: () => {
			// cookieStore.delete('session')
			cookieStore.delete('access')
			cookieStore.delete('refresh')
			cookieStore.delete('user')
			// cookieStore.delete('auth')
		}
	}
}