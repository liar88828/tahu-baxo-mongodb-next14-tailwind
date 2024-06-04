export function TabProduct() {
	return (
		<div
			role='tablist'
			className='tabs tabs-boxed'>
			<a
				role='tab'
				className='tab'>
				New Product
			</a>
			<a
				role='tab'
				className='tab tab-active'>
				Best Selling
			</a>
			<a
				role='tab'
				className='tab'>
				Discount
			</a>
		</div>
	)
}
