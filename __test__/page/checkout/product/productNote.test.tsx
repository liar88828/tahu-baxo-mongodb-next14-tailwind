import { expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ProductNote } from "@/app/(sites)/checkout/product/ProductNote";

test('page checkout payment item : success', async () => {
	render(<ProductNote/>);
	await waitFor(() => {
		expect(screen.getByTestId('checkout-ProductNote',)).toBeDefined()
		expect(screen.getByPlaceholderText('Write a note for product ...', {})).toBeDefined()
	});
})