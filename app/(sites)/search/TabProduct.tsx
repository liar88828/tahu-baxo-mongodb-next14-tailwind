'use client'
import { ParamsProfile } from "@/interface/server/param";
import { usePageSearch } from "@/hook/usePageSearch";

const loopTabBar = [
	{
		link: '/search?tab=new-product',
		key: 'new-product',
		title: "New Product"
	}, {
		link: '/search?tab=best-selling',
		key: 'best-selling',
		title: "Best Selling"
	}, {
		link: '/search?tab=discount',
		key: 'discount',
		title: "Discount"
	}
]

export function TabProduct({ params: { searchParams: { tab } } }: { params: ParamsProfile }) {
	const { updateQueryParams } = usePageSearch()
	
	tab = tab === undefined ? 'new-product' : tab;
	return (
		<div role="tablist" className="tabs tabs-bordered">
			
			{ loopTabBar.map(item => (
				<button
					key={ item.key }
					// href={ item.link }
					role='tab'
					onClick={ () => updateQueryParams("tab", item.key) }
					className={ `tab ${ tab === item.key ? 'tab-active' : '' }` }>
					{ item.title }
				</button>
			)) }
		
		</div>
	)
}
