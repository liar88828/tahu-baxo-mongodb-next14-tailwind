import React from 'react';

function Rating({ size = 'md', name = '123' }: {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
	name: string,
}) {
	return (
		<div
			data-testid={ "Rating" }
			className={ `rating ${ "rating-" + size }` }>
			<input type="radio" name={ `rating-${ name }` } className="mask mask-star-2 bg-orange-400"/>
			<input type="radio" name={ `rating-${ name }` } className="mask mask-star-2 bg-orange-400"/>
			<input type="radio" name={ `rating-${ name }` } className="mask mask-star-2 bg-orange-400" defaultChecked/>
			<input type="radio" name={ `rating-${ name }` } className="mask mask-star-2 bg-orange-400"/>
			<input type="radio" name={ `rating-${ name }` } className="mask mask-star-2 bg-orange-400"/>
		</div>
	);
}

export default Rating;