import { ParamsProfile } from "@/interface/ParamsProfile";
import Link from "next/link";

export function TabProduct({params : {searchParams : {tab}}} : { params : ParamsProfile }) {
  tab = tab === undefined ? 'new-product' : tab;
  return (
    <div role="tablist" className="tabs tabs-boxed">
      <Link
        href={'/search?tab=new-product'}
        role='tab'
        className={`tab ${tab === 'new-product' ? 'tab-active' : ''}`}
      >
        New Product
      </Link>
      <Link
        href={'/search?tab=best-selling'}
        role='tab'
        className={`tab ${tab === 'best-selling' ? 'tab-active' : ''}`}
      >
        Best Selling
      </Link>
      <Link
        href={'/search?tab=discount'}
        role='tab'
        className={`tab ${tab === 'discount' ? 'tab-active' : ''}`}

      >
        Discount
      </Link>
    </div>
  )
}
