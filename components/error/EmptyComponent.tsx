import Link from "next/link";
import React from "react";

interface EmptyComponentProps {
	btnOn?: boolean;
	title?: string;
	link?: string;
}

export function EmptyComponent(
	{ title = "Data Is Empty", link = '/home', btnOn = false }: EmptyComponentProps) {
	return (
		<div
			data-testid="EmptyComponent"
			className={ 'card card-compact card-bordered' }>
			<div className={ 'card-body ' }>
				<h1 className={ 'card-title' }>{ title } </h1>
				{ btnOn
					? <Link
						href={ link }
						className={ 'btn btn-square' }>
						Back to Home
					</Link>
					: null }
			</div>
		</div>
	);
}