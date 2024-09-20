import React from 'react';
import { ParamsClient } from "@/interface/server/param";
import { EmptyComponent } from "@/components/error/EmptyComponent";
import { getProductId } from "@/server/action/product.action";
import FormEditProduct from "@/app/(sites)/profile/(tab)/product/edit/formEditProduct";

export default async function Page({ params }: ParamsClient) {
	const data = await getProductId(Number(params.id))
	
	if (!data) return <EmptyComponent/>
	
	return (
		<div className="p-5 space-y-5">
			<div className="text-left">
				<h1 className={ 'text-3xl font-bold' }>Edit Product</h1>
				<p className={ 'text-lg font-light' }>Update the Product</p>
			</div>
			<FormEditProduct item={ data }/>
		</div>
	);
}

