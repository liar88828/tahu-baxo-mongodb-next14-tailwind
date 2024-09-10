import React, { Suspense } from 'react';
import { ProfileInfo } from "@/app/(sites)/checkout/profile/ProfileInfo";
import { ProductList } from "@/app/(sites)/checkout/product/ProductList";
import { Payment } from "@/app/(sites)/checkout/payment/Payment";
import { Delivery } from "@/app/(sites)/checkout/delivery/Delivery";
import { TotalPay } from "@/app/(sites)/checkout/TotalPay";
import { SkeletonCard, SkeletonCardLong } from "@/components/Skeleton";

export default async function page() {
	
	return (<>
      <div className='space-y-6 p-4'>
        <Suspense fallback={<SkeletonCard />}>
          <ProfileInfo />
        </Suspense>
        <Suspense fallback={ <SkeletonCardLong/> }>
          <ProductList/>
        </Suspense>
        <Suspense fallback={<SkeletonCard />}>
					<Delivery/>
        </Suspense>
        <Suspense fallback={<SkeletonCard />}>
					<Payment/>
        </Suspense>
        <TotalPay />
      </div>
    </>
  )
}
