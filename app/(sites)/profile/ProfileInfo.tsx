'use client'
import { Icon } from '@iconify/react'

export function ProfileInfo() {
	return (
		<div>
			<div className='flex rounded-lg border-white/30 p-2 border-2 space-x-2'>
				<img
					src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
					alt='avatar'
					className='h-auto w-20 rounded-full'
				/>
				<div className='flex  justify-between w-full'>
					<div className='space-y-2'>
						<h1 className='text-lg font-bold'>Username Jhon Doe</h1>
						<div className=''>
							<div className='flex space-x-3'>
								<h1 className='text-sm'>@johndoe</h1>
								<h1 className='text-sm'>012 1232 2133</h1>
							</div>
							<h1 className='text-xs font-light'>
								Jl Merpati II 42 RT 003/06, Dki Jakarta
							</h1>
						</div>
					</div>
					<button className='btn btn-circle btn-outline btn-sm'>
						{/* edit */}
						<Icon icon='material-symbols:edit' />
					</button>
				</div>
			</div>
		</div>
	)
}
