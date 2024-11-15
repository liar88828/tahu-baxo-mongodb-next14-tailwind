import { ParamsClient } from "@/interface/server/param";
import { ProductList } from "@/app/(sites)/profile/(tab)/product/ProductList";
import { Suspense } from "react";
import { LoadingBounce } from "@/components/loading/loading";

function Page({ searchParams: { search } }: ParamsClient) {
	return (
		<Suspense fallback={ <LoadingBounce/> }>
			<ProductList search={ search }/>
		</Suspense>
	)
}

export default Page;