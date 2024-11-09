import React from 'react';

function Divider({ title }: { title?: string }) {
	return (
		<div
			data-testid="Divider"
			className="divider my-1">{ title }</div>
	);
}

export default Divider;