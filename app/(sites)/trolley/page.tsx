import NavBottom from './NavBottom'
import { Product } from './Product'
import { Suspense } from "react";
import { LoadingBounce } from "@/components/loading";

export default async function page() {
	
	return (
    <>
      <div className='p-5 space-y-2 pb-52'>
				<Suspense fallback={ <LoadingBounce/> }>
				<Product/>
        <NavBottom />
				</Suspense>
      </div>
    </>
  )
}
