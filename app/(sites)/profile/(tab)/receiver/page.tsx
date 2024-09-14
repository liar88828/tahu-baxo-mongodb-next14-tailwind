import React from 'react';
import { getAllDataReceiver } from "@/server/action/received.action";
import ErrorComponent from "@/components/ErrorComponent";
import { Shipping } from "@/app/(sites)/profile/(tab)/receiver/shipping";
import { ParamsProfile } from "@/interface/server/param";
import { TitleSearch } from "@/components/TitleSearch";
import { IconSearch } from "@/components/icon/IconMore";

export default async function Page({ searchParams: { search } }: ParamsProfile) {
	const receiver = await getAllDataReceiver(search)
	if (!receiver) {
		return <ErrorComponent/>
	}
	return (
		<div>
			<TitleSearch
				title={ `Result :${ receiver.data.length }` }
				button={ <IconSearch/> }
			/>
			<div className={ ' grid grid-cols-2 gap-2' }>
				{ receiver.data.map(item => <Shipping key={ item.id } item={ item }/>) }
			</div>
		</div>
	);
}


