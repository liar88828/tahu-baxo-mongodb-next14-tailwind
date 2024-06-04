'use client'

export function ProfileStatus() {
	return (
		<div className='grid grid-cols-2 gap-2'>
			<ProfileStatusItem
				title='All Types Product'
				count={10}
			/>
			<ProfileStatusItem
				title='All Products Sold'
				count={2324}
			/>
		</div>
	)
}

export function ProfileStatusItem({
	title,
	count,
}: {
	title: string
	count: number
}) {
	return (
		<div className='rounded-lg border-white/30 p-2 border-2'>
			<h1 className='text-lg font-bold'>{title}</h1>
			<h2>{count}</h2>
		</div>
	)
}
