import { ParamsClient } from "@/interface/server/param";
import { DeliveryList } from "@/app/(sites)/profile/(tab)/delivery/DeliveryList";
import { LoadingBounce } from "@/components/loading/loading";
import React, { Suspense } from "react";

function Page({ searchParams: { search } }: ParamsClient) {
	return (
		<Suspense fallback={ <LoadingBounce/> }>
			<DeliveryList search={ search }/>
		</Suspense>
	)
}

export default Page;