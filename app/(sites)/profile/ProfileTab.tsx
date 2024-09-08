import Link from "next/link";
import { ParamsProfile } from "@/interface/server/param";

export function ProfileTab({params : {searchParams : {tab}}} : { params : ParamsProfile }) {
  return (
    <div role="tablist" className="tabs tabs-bordered shadow">
      <Link
        href={'/profile?tab=product'}
        role='tab'
        className={`tab ${tab === 'product' || tab == null ? 'tab-active' : ''}`}
      >
        Product
      </Link>
      <Link
        href={'/profile?tab=delivery'}
        role='tab'
        className={`tab ${tab === 'delivery' ? 'tab-active' : ''}`}
      >
        Delivery
      </Link>
      <Link
        href={'/profile?tab=payment'}
        role='tab'
        className={`tab ${tab === 'payment' ? 'tab-active' : ''}`}
      >
        Payment
      </Link>
    </div>
  );
}
