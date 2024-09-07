import Link from "next/link";
import React from "react";
import { IconBack, IconFavorite, IconTrolley } from "@/components/icon/IconMore";

export default function page() {
	
	return (
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
			<div className='navbar-end'>
				<button className='btn btn-ghost btn-circle'>
					<IconFavorite/>
				</button>
				<button className='btn btn-ghost btn-circle'>
					<div className='indicator'>
						<IconTrolley/>
						<span className='badge badge-xs badge-primary indicator-item'></span>
					</div>
				</button>
			
			</div>
		</div>
	)
}
