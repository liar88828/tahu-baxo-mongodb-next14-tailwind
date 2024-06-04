'use client';



export function ProfileTab ()
{
	return (
		<div
			role='tablist'
			className='tabs tabs-boxed'>
			<a
				role='tab'
				className='tab'>
				Product
			</a>
			<a
				role='tab'
				className='tab tab-active'>
				Delivery
			</a>
			<a
				role='tab'
				className='tab'>
				Payment
			</a>
		</div>
	);
}
