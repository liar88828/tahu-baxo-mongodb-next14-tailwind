import { ProfileTab } from "@/app/(sites)/profile/com/ProfileTab";
import React, { ReactNode } from "react";
import { ProfileStatus } from "@/app/(sites)/profile/com/ProfileStatus";
import { IconBack } from "@/components/icon/IconMore";
import Link from "next/link";

function Layout({ children }: { children: ReactNode }) {
	return (<>
			<div className='navbar bg-base-100'>
				<div className='navbar-start'>
					<Link
						href='/profile'
						className='btn btn-ghost btn-circle'
					>
						<IconBack/>
					</Link>
				</div>
				<div className='navbar-center'>
					<a className='btn btn-ghost text-xl'>Profile</a>
				</div>
				<div className='navbar-end'>
					<button className='btn btn-ghost btn-circle'>
					
					</button>
					<button className='btn btn-ghost btn-circle'>
						<div className='indicator'>
						
						</div>
					</button>
				</div>
			</div>
			<div className={ 'px-4 space-y-4' }>
				<div className="border rounded-lg shadow-sm p-4 space-y-4">
					<ProfileTab/>
					<ProfileStatus/>
				</div>
				{ children }
			</div>
		</>
	);
}

export default Layout;