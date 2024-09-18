import { IconAdd, IconLocation, IconRemove } from "@/components/icon/IconMore";
import React from "react";
import { ShippingProps } from "@/app/(sites)/profile/(tab)/receiver/shipping";

export function ShippingAddressCheckout({ item, click, add = false }: ShippingProps) {
	return <div
		className={ "card card-bordered card-compact" }>
		<div className="card-body">
			<div className={ "card-title justify-between" }>
				<div className="flex items-center gap-2">
					<IconLocation/>
					<h1 className={ "text-xl font-bold" }>{ item.name }</h1>
				</div>
				<form method="dialog">
					<button
						onClick={ click }
						className="btn mt-4 btn-square btn-sm">
						{
							add ? <IconAdd/> : <IconRemove/>
						}
					</button>
				</form>
			</div>
			<p>{ item.phone }</p>
			<p>{ item.address }</p>
		</div>
	</div>;
}