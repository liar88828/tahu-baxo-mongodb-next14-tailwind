import Link from "next/link";
import React from "react";

interface EmptyComponentProps {
	btnOn?: boolean;
	title?: string;
	link?: string;
	children?: React.ReactNode;
}

export function EmptyComponent(
	{
		title = "Data Is Empty",
		link = '/home',
		btnOn = false,
		children
	}: EmptyComponentProps) {
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

export function EmptyTrolley(
	{
		title = "Data Is Empty",
		link = '/search',
		btnOn = false,
	}: EmptyComponentProps) {
	return (
		<div
			data-testid="EmptyComponent"
			className={ 'card card-compact card-bordered ' }>
			<div className={ 'card-body flex-row justify-between' }>
				<h1 className={ 'card-title' }>{ title } </h1>
				{ btnOn
					? <Link href={ link } className={ 'btn text-nowrap' }>Add Product</Link>
					: null }
			</div>
		</div>
	);
}