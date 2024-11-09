import { ParamsClient } from "@/interface/server/param";
import React, { Suspense } from "react";
import { PaymentList } from "@/app/(sites)/profile/(tab)/payment/PaymentList";
import { LoadingBounce } from "@/components/loading/loading";

function Page({ searchParams: { search } }: ParamsClient) {
	return (
		<Suspense fallback={ <LoadingBounce/> }>
			<PaymentList search={ search }/>
		</Suspense>
	)
}

export default Page;

