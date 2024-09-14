import React from 'react';

function Divider({ title }: { title?: string }) {
	return (
		<div className="divider my-1">{ title }</div>
	);
}

export default Divider;