import React from 'react';
import Link from "next/link";
import { onLogout } from "@/server/action/auth.action";
import { cookieService } from "@/server/service/auth/cookie.service";

async function Page() {
	const user = await cookieService()
	return (< >
			<div
				data-testid="logout-Page"
				className="p-5 space-y-5">
				<div className="text-left">
					<h1 className={ 'text-3xl font-bold' }>You’ve Been Logged Out</h1>
					<p className={ 'text-lg font-light' }>You have successfully logged out of your account.</p>
				</div>
				{ user.checkAuth &&
					<form action={ onLogout }>
						<button
							type={ 'submit' }
							className="btn btn-primary btn-lg"
						>Logout
						</button>
					</form>
				}
				
				
				<div className="space-y-1 pt-1 flex flex-col">
					<p>
						<Link href={ '/auth/login' }
									className={ ' text-primary cursor-pointer  underline ' }
						
						> Sign in </Link>
						again if you want to access your account.</p>
					<p>Need to go somewhere else?</p>
					
					<Link
						href={ '/auth/login' }
						className={ ' text-primary cursor-pointer  underline ' }
					>
						Go to Homepage
					</Link>
					
					<Link
						href={ '/auth/login' }
						className={ ' text-primary cursor-pointer underline ' }
					>Visit Support</Link>
				</div>
			</div>
		</>
	);
}

export default Page;