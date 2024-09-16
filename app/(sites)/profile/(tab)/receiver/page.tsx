import React, { Suspense } from 'react';
import ErrorComponent from "@/components/error/ErrorComponent";
import { Shipping } from "@/app/(sites)/profile/(tab)/receiver/shipping";
import { ParamsProfile } from "@/interface/server/param";
import { TitleSearch } from "@/components/title/TitleSearch";
import { IconSearch } from "@/components/icon/IconMore";
import { getDataReceiver } from "@/server/action/receiver.action";
import { Loading } from "@/components/loading/loading";

export default async function Page({ searchParams: { search } }: ParamsProfile) {
	const receiver = await getDataReceiver(search)
	if (!receiver) {
		return <ErrorComponent/>
	}
	return (
		<Suspense fallback={ <Loading/> }>
			<TitleSearch
				title={ `Result :${ receiver.data.length }` }
				button={ <IconSearch/> }
			/>
			<Shipping data={ receiver.data }/>
		</Suspense>
	);
}
