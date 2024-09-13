import { ParamsProfile } from "@/interface/server/param";
import React, { Suspense } from "react";
import { PaymentList } from "@/app/(sites)/profile/payment/PaymentList";
import { LoadingBounce } from "@/components/loading";

function Page({ searchParams: { search } }: ParamsProfile) {
	return (
		<Suspense fallback={ <LoadingBounce/> }>
			<PaymentList search={ search }/>
		</Suspense>
	)
}

export default Page;

