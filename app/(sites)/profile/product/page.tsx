import { ParamsProfile } from "@/interface/server/param";
import { ProductList } from "@/app/(sites)/profile/product/ProductList";
import { Suspense } from "react";
import { LoadingBounce } from "@/components/loading";

function Page({ searchParams: { search } }: ParamsProfile) {
	return (
		<Suspense fallback={ <LoadingBounce/> }>
			<ProductList search={ search }/>
		</Suspense>
	)
}

export default Page;