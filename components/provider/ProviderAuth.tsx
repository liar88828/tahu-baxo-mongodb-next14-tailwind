'use client'
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { redirect } from "next/navigation";

export type TProviderAuth = {
	auth: string
	setAuth: React.Dispatch<React.SetStateAction<string>>
}
export const AuthContext = createContext<TProviderAuth>(
	{
		auth: "",
		setAuth: () => {
		},
	});

export default function ProviderAuth({ children }: { children: ReactNode }) {
	// is access token
	const [auth, setAuth] = useState<string>("");
	return (
		<AuthContext.Provider value={ { auth, setAuth } }>{ children }</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const { auth, setAuth, } = useContext(AuthContext);
	
	function getSession() {
		// const session = cookies().get('user')
		// if (!session?.value) {
		// 	// redirect('/auth/login')
		// 	return false
		// }
		// return session.value;
	}
	
	function setSession() {
		if (auth) {
			// cookies().set('user', auth)
		}
		return false
	}
	
	function deleteSession() {
		// cookies().delete('user')
		redirect('/auth/login')
	}
	
	return { setSession, getSession, deleteSession, setAuth, auth, };
}

