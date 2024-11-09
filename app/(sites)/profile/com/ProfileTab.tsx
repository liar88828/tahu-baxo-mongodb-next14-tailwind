'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const tabList = [{
  link: '/profile/product?tab=product',
  tab: 'product',
  name: 'Product',
},
  {
    link: '/profile/delivery?tab=delivery',
    tab: 'delivery',
    name: 'Delivery',
  },
  {
    link: '/profile/payment?tab=payment',
    tab: 'payment',
    name: 'Payment',
  },
  {
    link: '/profile/receiver?tab=receiver',
    tab: 'receiver',
    name: 'Receiver',
  }
]

export function ProfileTab({}) {
  const pathname = usePathname();
  return (
    <div role="tablist" className="tabs tabs-boxed tabs-sm sm:tabs-md ">
      { tabList.map((item) => (
        <Link
          key={ item.tab }
          href={ item.link }
          role='tab'
          className={ `tab ${ pathname.includes(item.tab) ? 'tab-active' : '' }` }
        >
          { item.name }
        </Link>
      )) }
    </div>
  );
}

export function ProfileTabX() {
  return (
    <div className=" tabs tabs-boxed">
      <div className={ 'tab tab-active' }>Overview</div>
      <div className={ 'tab' }>Orders</div>
      <div className={ 'tab' }>Settings</div>
      <div className={ 'tab' }>Payment</div>
    </div>
  );
}