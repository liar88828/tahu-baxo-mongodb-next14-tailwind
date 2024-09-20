import React from 'react';
import { EmptyComponent } from "@/components/error/EmptyComponent";
import { ParamsClient } from "@/interface/server/param";
import { getDataReceiverId } from "@/server/action/receiver.action";
import FormUpdateReceiver from "@/app/(sites)/profile/(tab)/receiver/edit/formUpdateReceiver";

async function Page({ params }: ParamsClient) {
	const data = await getDataReceiverId(Number(params.id))
	if (!data) return <EmptyComponent/>
	
	return (
		<div className="p-5 space-y-5">
			<div className="text-left">
				<h1 className={ 'text-3xl font-bold' }>Add Receiver</h1>
				<p className={ 'text-lg font-light' }>Add New Receiver</p>
			</div>
			
			<FormUpdateReceiver item={ data }/>
		
		</div>
	);
}

export default Page;