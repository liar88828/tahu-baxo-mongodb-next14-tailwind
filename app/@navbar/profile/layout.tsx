import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { IconBack } from "@/components/icon/IconMore";

export default function page({ children }: PropsWithChildren) {
	return (<>
			<div className='navbar bg-base-100'>
				<div className='navbar-start'>
					<Link
						href='/home'
						className='btn btn-ghost btn-circle'
					>
						{/* back */ }
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
			{ children }
		</>
	
	)
}
