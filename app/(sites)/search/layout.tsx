import Link from 'next/link'
import React, { ReactNode, Suspense } from 'react'
import { SearchInput } from "@/app/(sites)/search/SearchInput";
import { IconBack } from "@/components/icon/IconMore";

export default function layout({ children }: { children: ReactNode }) {
	
	return (<>
		<div className='navbar bg-base-100 space-x-2'>
			<div className='flex-1'>
				<Link href='/home' className='btn btn-ghost btn-circle'>
					<IconBack/>
				</Link>
			</div>
			<Suspense fallback={ <h1>Loading</h1> }>
				<SearchInput/>
			</Suspense>
		</div>
			{ children }
		</>
	)
}
