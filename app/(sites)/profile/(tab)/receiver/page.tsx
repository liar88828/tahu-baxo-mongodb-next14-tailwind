import React, { Suspense } from 'react';
import ErrorComponent from "@/components/error/ErrorComponent";
import { ParamsClient } from "@/interface/server/param";
import { TitleSearch } from "@/components/title/TitleSearch";
import { IconSearch } from "@/components/icon/IconMore";
import { getDataReceiver } from "@/server/action/receiver.action";
import { Loading } from "@/components/loading/loading";
import { ShippingItem } from "@/app/(sites)/profile/(tab)/receiver/shippingItem";

export default async function Page({ searchParams: { search } }: ParamsClient) {
	const data = await getDataReceiver(search)
	if (!data) {
		return <ErrorComponent/>
	}
	return (
		<Suspense fallback={ <Loading/> }>
			<TitleSearch
				title={ `Result :${ data.data.length }` }
				button={ <IconSearch/> }
			/>
			
			<div className={ ' grid grid-cols-1 sm:grid-cols-2 gap-2' }>
				{ data.data.map(item => <ShippingItem
						key={ item.id }
						item={ item }
					/>
				) }
			</div>
		</Suspense>
	);
}
