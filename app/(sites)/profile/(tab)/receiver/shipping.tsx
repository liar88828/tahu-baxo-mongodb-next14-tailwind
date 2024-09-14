import { ReceiverDB } from "@prisma/client";
import { IconLocation } from "@/components/icon/IconMore";
import React from "react";

export function Shipping({ item }: { item: ReceiverDB }) {
	return (
		<div className={ 'card card-bordered card-compact ' }>
			<div className="card-body">
				<div className={ 'card-title' }>
					<div className="flex items-center gap-2">
						<IconLocation/>
						Shipping Address
					</div>
				</div>
				<div>
					<h1 className={ 'text-xl font-bold' }>{ item.name }</h1>
					<p>{ item.address }</p>
					<button className="btn mt-4">
						Detail
					</button>
				</div>
			</div>
		</div>
	);
}