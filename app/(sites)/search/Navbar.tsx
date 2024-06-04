'use client'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

export default function Navbar ( { children }: {children:React.ReactNode} ) {
	return (
		<div className='navbar bg-base-100 space-x-2'>
			<div className='flex-1'>
				<Link
					href='/home'
					className='btn btn-ghost btn-circle'>
					{/* back */}
					<Icon
						icon='ic:round-arrow-back'
						className='size-5'
					/>
				</Link>
			</div>
			{children}
		</div>
	)
}
