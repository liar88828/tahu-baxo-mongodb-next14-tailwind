import React from 'react';

function Rating({ size = 'rating-md', name = '123' }: {
	size?: string,
	name: string,
}) {
	return (
		<div className={ `rating ${ size }` }>
			<input type="radio" name={ `rating-${ name }` } className="mask mask-star-2 bg-orange-400"/>
			<input type="radio" name={ `rating-${ name }` } className="mask mask-star-2 bg-orange-400"/>
			<input type="radio" name={ `rating-${ name }` } className="mask mask-star-2 bg-orange-400" defaultChecked/>
			<input type="radio" name={ `rating-${ name }` } className="mask mask-star-2 bg-orange-400"/>
			<input type="radio" name={ `rating-${ name }` } className="mask mask-star-2 bg-orange-400"/>
		</div>
	);
}

export default Rating;