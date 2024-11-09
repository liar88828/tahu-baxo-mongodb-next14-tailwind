import { render, screen } from '@testing-library/react'
import { expect, test } from "vitest";
import { productDataList } from "@/assets/example/product";
import { ProductItemCard } from "@/components/product/ProductItemCard";

test('success ProductItemCard', () => {
	const item = productDataList[0]
	render(
		// @ts-ignore
		<ProductItemCard item={ productDataList[0] }
		/>)
	expect(screen.getByTestId('ProductItemCard',)).toBeDefined()
	expect(screen.getByText("new")).toBeDefined()
	expect(screen.getByText("123 sold")).toBeDefined()
	expect(screen.getByText(item.name)).toBeDefined()
	// expect(screen.getByText(Rupiah(item.price))).toBeDefined()
	
})


