import Link from "next/link";
import React, { ReactNode } from "react";
import { IconBack, IconFavorite, IconTrolley } from "@/components/icon/IconMore";
import { getUserTrolley } from "@/server/action/trolley.action";

export default async function layout({ children }: { children: ReactNode }) {
	const userTrolley = await getUserTrolley()
	console.log(userTrolley)
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
				<a className='btn btn-ghost text-xl'>Product</a>
			</div>
			<div className='navbar-end pr-2'>
				<button className='btn btn-ghost btn-circle'>
					<IconFavorite/>
				</button>
				<div className='indicator'>
					<span className=" indicator-item badge badge-primary badge-xs
					text-xs
					">{ userTrolley }</span>
					<Link
						href={ '/trolley' }
						
						className='btn btn-xs  btn-circle btn-ghost'>
						<IconTrolley/>
					</Link>
					</div>
			</div>
		</div>
			{ children }
		</>
		
	)
}
