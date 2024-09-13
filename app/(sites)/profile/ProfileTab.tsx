'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ProfileTab() {
  const pathname = usePathname();
  return (
    <div role="tablist" className="tabs tabs-bordered  ">
      <Link
        href={ '/profile/product?tab=product' }
        role='tab'
        className={ `tab ${ pathname.includes('product') ? 'tab-active' : '' }` }
      >
        Product
      </Link>
      <Link
        href={ '/profile/delivery?tab=delivery' }
        role='tab'
        className={ `tab ${ pathname.includes('delivery') ? 'tab-active' : '' }` }
      >
        Delivery
      </Link>
      <Link
        href={ '/profile/payment?tab=payment' }
        role='tab'
        className={ `tab ${ pathname.includes('payment') ? 'tab-active' : '' }` }
      >
        Payment
      </Link>
    </div>
  );
}
