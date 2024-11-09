import Link from "next/link"
import { IconHome } from "@/components/icon/IconMore";
import React from 'react';

export const message = {
	'default': {
		'msg': '\tSorry, we couldn\'t find the data you\'re looking for.'
	},
	'trolley': {
		'empty': 'Sorry the data product is not found or maybe empty'
	}
}

export default function ErrorComponent(
	{
		title = message.default.msg,
		code = 404,
		msg = 'Data Not Found',
		link = '/',
		back = 'Back to Home'
	}: {
		title?: string,
		back?: string,
		link?: string,
		msg?: string,
		code?: number,
		
	}) {
	return (
		
		<main
			data-testid="ErrorComponent"
			className="mt-20 p-4">
			<section className='card card-compact card-bordered p-2'>
				<div className="card-body items-center space-y-4">
					<div className="space-y-4 text-center ">
				<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{ code }</h1>
				<h2 className="text-2xl font-semibold tracking-tight lg:text-3xl">{ msg }</h2>
				<p className="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
					{ title }
				</p>
			</div>
				<Link href={ link }>
					<div className="animate-bounce rounded-full p-4 border">
						<IconHome/>
					</div>
				</Link>
			{ back }
				</div>
			</section>
		</main>
	)
}

