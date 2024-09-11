import Link from "next/link"
import { IconHome } from "@/components/icon/IconMore";

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
		<main className="flex flex-col items-center justify-center mt-20">
			<div className="space-y-4 text-center">
				<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{ code }</h1>
				<h2 className="text-2xl font-semibold tracking-tight lg:text-3xl">{ msg }</h2>
				<p className="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
					{ title }
				</p>
			</div>
			<div className="mt-8">
				<Link href={ link }>
					<div className="animate-bounce rounded-full p-4 mb-4 border">
						<IconHome/>
					</div>
				</Link>
			</div>
			{ back }
		</main>
	)
}