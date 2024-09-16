import React, { Suspense } from 'react';
import { TotalPay } from "@/app/(sites)/checkout/TotalPay";
import { Description } from "@/app/(sites)/checkout/Description";
import ProfileInfo from "@/app/(sites)/checkout/profile/ProfileInfo";
import { SkeletonCard, SkeletonCardLong } from "@/components/loading/Skeleton";
import { ProductCheckout } from "@/app/(sites)/checkout/product/ProductCheckout";
import { Delivery } from "@/app/(sites)/checkout/delivery/Delivery";
import { Payment } from "@/app/(sites)/checkout/payment/Payment";

export default async function Page() {
  return (
    
    <div
      data-testid={ 'checkout-page' }
      className='space-y-6 p-4'>
      
      <Suspense fallback={<SkeletonCard />}>
          <ProfileInfo />
        </Suspense>
      
      <Suspense fallback={ <SkeletonCardLong/> }>
        <ProductCheckout/>
      </Suspense>
      
      <Suspense fallback={ <SkeletonCard/> }>
        <Delivery/>
      </Suspense>
      
      <Suspense fallback={ <SkeletonCard/> }>
        <Payment/>
      </Suspense>
      
      <Description/>
      <TotalPay/>
      </div>
  )
}
