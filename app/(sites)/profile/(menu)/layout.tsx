'use client'
import React, { ReactNode } from "react";
import { IconBack } from "@/components/icon/IconMore";
import { useRouter } from "next/navigation";

function Layout({ children }: { children: ReactNode }) {
	const route = useRouter();
	return (<>
			<div className='navbar bg-base-100'>
				<div className='navbar-start'>
					<button
						onClick={ () => route.back() }
						className='btn btn-ghost btn-circle'
					>
						<IconBack/>
					</button>
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
			<div className="~px-4/8">
				{ children }
			</div>
		</>
	);
}

export default Layout;