import React from 'react';
import FormEditBank from "@/app/(sites)/profile/(tab)/payment/edit/formEditBank";
import { getBankIdPrivate } from "@/server/action/bank.action";
import { ParamsClient } from "@/interface/server/param";
import { EmptyComponent } from "@/components/error/EmptyComponent";

async function Page({ params }: ParamsClient) {
	const data = await getBankIdPrivate(params.id)
	if (!data) return <EmptyComponent/>
	
	return (
		<div className="p-5 space-y-5">
			<div className="text-left">
				<h1 className={ 'text-3xl font-bold' }>Edit Payment</h1>
				<p className={ 'text-lg font-light' }>Update Payment Method </p>
			</div>
			<FormEditBank item={ data }/>
		</div>
	);
}

export default Page;
