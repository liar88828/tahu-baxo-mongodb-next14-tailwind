import React, { Suspense } from 'react';
import { ProfileInfo } from "@/app/(sites)/checkout/ProfileInfo";
import { ProductList } from "@/app/(sites)/checkout/ProductList";
import { PaymentList } from "@/app/(sites)/checkout/PaymentList";
import { DeliveryList } from "@/app/(sites)/checkout/DeliveryList";
import { TotalPay } from "@/app/(sites)/checkout/TotalPay";
import { SkeletonCard, SkeletonCardLong } from "@/components/Skeleton";
import { getTrolley } from "@/server/action/test";

export default async function page() {
  const data = await getTrolley()
  if (!data) {
    return <h1>Data Trolley is Empty</h1>
  }
  return (<>
      <div className='space-y-6 p-4'>
        <Suspense fallback={<SkeletonCard />}>
          <ProfileInfo />
        </Suspense>
        <Suspense fallback={ <SkeletonCardLong/> }>
          <ProductList/>
        </Suspense>
        <Suspense fallback={<SkeletonCard />}>
          <DeliveryList />
        </Suspense>
        <Suspense fallback={<SkeletonCard />}>
          <PaymentList />
        </Suspense>
        <TotalPay />
      </div>
    </>
  )
}
