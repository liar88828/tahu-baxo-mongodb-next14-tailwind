import { expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Description } from "@/app/(sites)/checkout/Description";

test('page checkout payment item : success', async () => {
	render(<Description/>);
	await waitFor(() => {
		expect(screen.getByTestId('checkout-ProductNote',)).toBeDefined()
		expect(screen.getByPlaceholderText('Write a note for product ...', {})).toBeDefined()
	});
})