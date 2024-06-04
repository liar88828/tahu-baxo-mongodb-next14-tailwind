import Link from 'next/link'

export default function Page() {
	return (
		<div className=''>
			<Link
				href='/home'
				className='btn btn-outline'>
				Click
			</Link>
		</div>
	)
}
