import React from 'react';
import Navbar from "@/app/(sites)/profile/Navbar";
import { ProfileInfo } from "@/app/(sites)/checkout/ProfileInfo";
import { ProductList } from "@/app/(sites)/checkout/ProductList";
import { PaymentList } from "@/app/(sites)/checkout/PaymentList";
import { DeliveryList } from "@/app/(sites)/checkout/DeliveryList";
import { TotalPay } from "@/app/(sites)/checkout/TotalPay";

export default function page() {
  return (<>
      <Navbar />
      <div className='space-y-6 p-4'>
        <ProfileInfo />
        <ProductList />
        <DeliveryList />
        <PaymentList />
        <TotalPay />
      </div>
    </>
  )
}
