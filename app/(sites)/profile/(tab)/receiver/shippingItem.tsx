import { IconEdit, IconLocation } from "@/components/icon/IconMore";
import Link from "next/link";
import React from "react";
import { ReceiverDB } from "@prisma/client";
import { DeliveryTitle } from "@/app/(sites)/profile/(tab)/delivery/DeliveryList";

export function ShippingItem({ item, }: { item: ReceiverDB }) {
	return <div
		className={ "card card-bordered card-compact" }>
		<div className="card-body">
			<div className={ "card-title justify-between" }>
				<div className="flex items-center gap-2">
					<IconLocation/>
					Shipping Address
				</div>
				
				
				<Link
					href={ `/profile/receiver/edit/${ item.id }` }
					className="btn mt-4 btn-square btn-sm">
					<IconEdit/>
				</Link>
			</div>
			<div>
				<DeliveryTitle title={ "Name Receiver" } text={ item.name }/>
				<DeliveryTitle title={ "Phone Number" } text={ item.phone }/>
				<DeliveryTitle title={ "Address" } text={ item.address }/>
			</div>
		</div>
	</div>;
}