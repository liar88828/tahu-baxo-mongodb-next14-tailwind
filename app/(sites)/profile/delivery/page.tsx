import { ParamsProfile } from "@/interface/server/param";
import { DeliveryList } from "@/app/(sites)/profile/delivery/DeliveryList";
import { LoadingBounce } from "@/components/loading";
import React, { Suspense } from "react";

function Page({ searchParams: { search } }: ParamsProfile) {
	return (
		<Suspense fallback={ <LoadingBounce/> }>
			<DeliveryList search={ search }/>
		</Suspense>
	)
}

export default Page;