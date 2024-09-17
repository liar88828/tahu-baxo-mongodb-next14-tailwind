'use client'
import { Icon } from '@iconify/react'
import React, { ReactNode } from 'react'
import { useRouter } from "next/navigation";

export default function layout({ children }: { children: ReactNode }) {
	const router = useRouter()
	return (<>
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
				<button
					onClick={ () => router.push('/home') }
          className='btn btn-ghost btn-circle'
        >
          {/* back */}
          <Icon
            icon='ic:round-arrow-back'
            className='size-5'
          />
				</button>
      </div>
      <div className='navbar-center'>
        <a className='btn btn-ghost text-xl'>daisyUI</a>
      </div>
      <div className='navbar-end'>
        <button className='btn btn-ghost btn-circle'>
        </button>
      </div>
    </div>
			{ children }
		</>
  )
}
