import Link from "next/link";
import React from "react";

export function DoneAll() {
	return (
		<div
			data-testid="done-DoneAll"
			className="text-left border rounded-lg p-5">
			<h1 className={ 'text-3xl font-bold' }>All Done !</h1>
			<p className={ 'text-lg font-light' }>We`ll send you reset instructors.</p>
			<Link
				href={ '/home' }
				className={ 'btn btn-block btn-secondary' }
			>Done</Link>
		</div>
	);
}