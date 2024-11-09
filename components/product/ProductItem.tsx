import React from "react";
import { ProductDB } from "@prisma/client";
import { getProductsAll } from "@/server/action/product.action";
import { ProductItemCard } from "@/components/product/ProductItemCard";

export async function ProductItem() {
	const data = await getProductsAll()
	if (!data) {
		return <h1>Data Product is Not found</h1>
	}
	return data.data.map((item) => <ProductItemCard
			item={ item }
			key={ item.id }
		/>
	)
}

export async function ProductItemSearch({ data }: { data: ProductDB[] }) {
	return data.map((item) => <ProductItemCard
			item={ item }
			key={ item.id }
		/>
	)
}

export async function ProductItemPrivate({ data }: { data: ProductDB[] }) {
	if (!data) {
		return <h1>Data Product is Not found</h1>
	}
	return data.map((item) => <ProductItemCard
		to={ `/profile/product/edit/${ item.id }` }
		item={ item }
		key={ item.id }
	/>)
}
