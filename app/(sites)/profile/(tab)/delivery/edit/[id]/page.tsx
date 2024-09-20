import React from 'react';
import FormEditDelivery from "@/app/(sites)/profile/(tab)/delivery/edit/formEditDelivery";
import { EmptyComponent } from "@/components/error/EmptyComponent";
import { ParamsClient } from "@/interface/server/param";
import { getDeliveryIdPrivate } from "@/server/action/delivery.action";

async function Page({ params }: ParamsClient) {
	const data = await getDeliveryIdPrivate(Number(params.id))
	
	if (!data) return <EmptyComponent/>
	
	return (
		<div className="p-5 space-y-5">
			<div className="text-left">
				<h1 className={ 'text-3xl font-bold' }>Add Delivery</h1>
				<p className={ 'text-lg font-light' }>Update Shipping</p>
			</div>
			
			<FormEditDelivery item={ data }/>
		
		</div>
	);
}

export default Page;
